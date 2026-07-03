const CategoryDetail = require('../models/CategoryDetail');
const SubcategoryDetail = require('../models/SubcategoryDetail');
const Project = require('../models/Project');
const inMemoryDb = require('../utils/inMemoryDb');

exports.getPortfolio = async (req, res) => {
  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  try {
    let categories = [];
    let subcategories = [];
    let projects = [];

    if (isMongoConnected) {
      categories = await CategoryDetail.find({});
      subcategories = await SubcategoryDetail.find({});
      projects = await Project.find({});
    } else {
      categories = inMemoryDb.inMemoryCategories;
      subcategories = inMemoryDb.inMemorySubcategories;
      projects = inMemoryDb.inMemoryProjects;
    }

    const assembled = categories.map(cat => {
      const catSubs = subcategories.filter(sub => sub.category === cat.id);
      const subCategoriesMapped = catSubs.map(sub => {
        const subProjs = projects.filter(proj => proj.category === cat.id && proj.subcategory.toLowerCase() === sub.title.toLowerCase());
        return {
          _id: sub._id,
          title: sub.title,
          description: sub.description,
          image: sub.image,
          galleryItems: subProjs.map(proj => ({
            _id: proj._id,
            title: proj.title,
            tag: proj.tag,
            code: proj.code,
            image: proj.image
          }))
        };
      });
      return {
        _id: cat._id,
        id: cat.id,
        title: cat.title,
        description: cat.description,
        heroImage: cat.heroImage,
        subCategories: subCategoriesMapped
      };
    });

    res.json(assembled);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving portfolio', error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { title, description, heroImage } = req.body;
  if (!title || !description || !heroImage) {
    return res.status(400).json({ message: 'Title, description and heroImage are required' });
  }

  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const catIdx = inMemoryDb.inMemoryCategories.findIndex(c => c.id === id);
    if (catIdx === -1) return res.status(404).json({ message: 'Category not found' });
    inMemoryDb.inMemoryCategories[catIdx] = { ...inMemoryDb.inMemoryCategories[catIdx], title, description, heroImage };
    return res.json(inMemoryDb.inMemoryCategories[catIdx]);
  }

  try {
    const cat = await CategoryDetail.findOne({ id });
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    cat.title = title;
    cat.description = description;
    cat.heroImage = heroImage;
    await cat.save();
    res.json(cat);
  } catch (err) {
    res.status(500).json({ message: 'Error updating category', error: err.message });
  }
};

exports.createSubcategory = async (req, res) => {
  const { category, title, description, image } = req.body;
  if (!category || !title || !description || !image) {
    return res.status(400).json({ message: 'Category, title, description and image are required' });
  }

  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const newSub = {
      _id: 'mem-sub-' + Date.now(),
      category,
      title,
      description,
      image
    };
    inMemoryDb.inMemorySubcategories.push(newSub);
    return res.status(201).json(newSub);
  }

  try {
    const newSub = new SubcategoryDetail({ category, title, description, image });
    await newSub.save();
    res.status(201).json(newSub);
  } catch (err) {
    res.status(500).json({ message: 'Error creating subcategory', error: err.message });
  }
};

exports.updateSubcategory = async (req, res) => {
  const { id } = req.params;
  const { title, description, image } = req.body;
  if (!title || !description || !image) {
    return res.status(400).json({ message: 'Title, description and image are required' });
  }

  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const subIdx = inMemoryDb.inMemorySubcategories.findIndex(s => s._id === id);
    if (subIdx === -1) return res.status(404).json({ message: 'Subcategory not found' });
    const oldTitle = inMemoryDb.inMemorySubcategories[subIdx].title;
    inMemoryDb.inMemorySubcategories[subIdx] = { ...inMemoryDb.inMemorySubcategories[subIdx], title, description, image };
    inMemoryDb.inMemoryProjects = inMemoryDb.inMemoryProjects.map(p => {
      if (p.subcategory.toLowerCase() === oldTitle.toLowerCase()) {
        return { ...p, subcategory: title };
      }
      return p;
    });
    return res.json(inMemoryDb.inMemorySubcategories[subIdx]);
  }

  try {
    const sub = await SubcategoryDetail.findById(id);
    if (!sub) return res.status(404).json({ message: 'Subcategory not found' });
    const oldTitle = sub.title;
    sub.title = title;
    sub.description = description;
    sub.image = image;
    await sub.save();

    await Project.updateMany(
      { subcategory: { $regex: new RegExp(`^${oldTitle}$`, 'i') } },
      { $set: { subcategory: title } }
    );
    res.json(sub);
  } catch (err) {
    res.status(500).json({ message: 'Error updating subcategory', error: err.message });
  }
};

exports.deleteSubcategory = async (req, res) => {
  const { id } = req.params;
  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const subIdx = inMemoryDb.inMemorySubcategories.findIndex(s => s._id === id);
    if (subIdx === -1) return res.status(404).json({ message: 'Subcategory not found' });
    const title = inMemoryDb.inMemorySubcategories[subIdx].title;
    inMemoryDb.inMemorySubcategories = inMemoryDb.inMemorySubcategories.filter(s => s._id !== id);
    inMemoryDb.inMemoryProjects = inMemoryDb.inMemoryProjects.filter(p => p.subcategory.toLowerCase() !== title.toLowerCase());
    return res.json({ message: 'Subcategory deleted successfully' });
  }

  try {
    const sub = await SubcategoryDetail.findById(id);
    if (!sub) return res.status(404).json({ message: 'Subcategory not found' });
    const title = sub.title;
    await SubcategoryDetail.findByIdAndDelete(id);
    await Project.deleteMany({ subcategory: { $regex: new RegExp(`^${title}$`, 'i') } });
    res.json({ message: 'Subcategory deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting subcategory', error: err.message });
  }
};

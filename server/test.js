const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: [authorSchema]

}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author: author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async  function updateAuthor(courseId)
{
  const course = await Course.findById(courseId);
  course.author.name = 'Mosh HameDanny';
  course.save();
}

async function addAuthor(courseId, author)
{
  const course = await Course.findById(courseId);
  course.author.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId)
{
  const course = await Course.findById(courseId);
  const authors = course.author.id(authorId);
  authors.remove();
  course.save();
}
addAuthor("5d16ecf92220294c3c9b2209", new Author({name: "Rodri"}));
//createCourse('Node Course', [new Author({ name: 'Mosh' })]);
listCourses();
//updateAuthor("5d16e6fb95501802dced84b8");
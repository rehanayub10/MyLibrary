#Steps to Reproduce

#Initialize Application Folders
1. npm install : express ejs express-ejs-layouts
2. install nodemon
3. Initialize "start" and "dev" scripts in package.json
4. Initialize view and public routes in server.js (look at comments there)
5. (Just for info) routes = controllers, models = (database) models
6. routes/index.js -> initialize default route '/'. Export as "router". Import into server.js and use. Works as "Hello World"
7. Go to views/layouts/layout.ejs. Initialize <%- body>.
8. Go to routes/index.js. Replace res.send with res.render(index)

#Setting up MongoDB
1. Install mongoose
2. Look through lines 14-18 on server.js
3. Save DATABASE_URL in .env file (npm install dotenv)
4. Create model for database storage in models/author.js
5. Look at if stmt at top of server.js - adjust with production build

#Setting Up Heroku
1. After installation + login, add heroku remote using cli and push, add env vars, and launch app
2. For ongoing changes: "git push heroku master" 

#Setting up Author Routes
1. Set up authors routes in routes/authors.js: Index (GET), New (GET) and Create (POST). Require and use in server.js
2. Create header/navbar in views/partials. Add to layouts/layout.
3. Define Author Schema inside models/author.js.
4. In views/authors/new.ejs -> set up form to add a new author. Add POST method to "/authors" - same URL contained in routes/author.js.
5. Set input value to be author.name (with EJS syntax). Don't know why this works just yet but req.body returns a JSON object
6. Add error checking in author creation route else redirect. Create a partial for ErrorMessage and add it to body of main layout
7. Configure '/authors' route. This retrieves all the authors present in the database (returned as a JSON object I think). If there's an error, user is redirected to homepage.
8. Go to views/authors/index.ejs -> create form for searching authors + retrieve all authors from database using EJS
9. Look at usage of "searchOptions" in routes/authors.js and views/authors/index.ejs. This has been used to configure the search functionality.

#Setting Up Book Routes
1. Create routes/books.js -> 3 routes: 1) Display all books 2) Form to add a new book 3) Add new book to collection using POST
2. Create Book Model -> models/book.js.
3. Require and use in server.js (test routes)
4. Add form field in views folder for adding new books (check routes/books.js and views/_form_fields.ejs). Look at complete HTML formatting.
5. To process file upload => Set form to multipart type. Look at usage of multer in routes/books.js. Also note how upload path is configured models/book.js.
6. Created function renderNewPage() in routes/books.js.
7. File gets uploaded automatically on submit. Added a function removeBookCover() to remove book cover from uploads whenever there's an error in creating a book.
8. Defined a virtual property inside models/book.js to return a unique path for each book cover uploaded to the site.
9. In routes/books.js, added search functionality. Lines 35-44.

#HomePage
1. Displays the 10 most recently added books (in descending order)

#FilePond Setup
1. Added CDN links in layout.ejs for main library, file encode and image preview, image resize.
2. In public/javascripts/fileUploads.js -> registered plugins + parsed body (based on instructions in documentation)
3. Went to views/books/_form_fields.ejs -> added class of "filepond" to cover image upload
4. Set options: style panel aspect ratio, image resize target width and image resize target height
5. routes/books.js -> remove upload.single and uninstall multer
6. Inside models/book.js -> change "CoverImageName" to "CoverImage" - change type to Buffer (of data representing entire image). Add a CoverImageType as String
6. Cover object from filepond is base 64 encoded data (a JSON object, and hence can be transmitted through routes as a string).
7. routes/books.js -> function saveCover(). Check cover encoded is a valid cover. Next get it unencoded. Save properties to the book.
8. routes/books.js > can remove remove book cover function and uses. + coverImageName and fileName section.
9. models -> book.js, match the actual image being returned from form. Remove coverImageBasePath.

#Setting Author Routes (Pt.2) - Video 5
1. Get route :/id (use req.params)
2. GET Edit author :/id/edit
3. PUT for update
4. route for delete author (id)
5. For PUT and DELETE, install method-override. Include and use in server.js
6. views/authors/index.ejs -> add links for view, edit, and delete (see how form method is used)
7. partials/deleteForm.ejs -> action is dynamic URL: see how passed in, and use of string interpolation
8. For author edit route, use Author.findById() to get author
9. views/authors/edit.ejs -> Add views/authors/edit.ejs, PUT request
10. models/author -> pre(Remove) 
11. show.ejs

#Setting Book Routes (Video 6)
1. (routes/books.js) Show Book
2. views/books/show.ejs
3. index.ejs -> link to book pages
4. show.ejs

#Unexplained/Interesting Bugs
1. To make it work in Firefox, had to add <%= authors.name%> as text content in views/books/_form_fields.ejs. Worked on Chrome though.
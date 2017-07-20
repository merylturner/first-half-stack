<img src="https://cloud.githubusercontent.com/assets/478864/22186847/68223ce6-e0b1-11e6-8a62-0e3edc96725e.png" width=30> My First Half Stack App
======

## Directions

* Combine a vanilla NodeJS http server with the mongodb drivers to create your first REST API
* Pick a "resource" - the entity (or collection in mongo speak) you're saving and getting, like `unicorns`
* Implement:
    * `GET /<resource>` - returns array of all of the resources
    * `POST /<resource>` - inserts the supplied request body as a document into the resource collection
    * `GET /<resource>/:id` -
      * returns the single object specified by the id
      * returns 404 not found if no resource found with that id    
    * `DELETE /<resource>/:id` - removes the resource with that id. not an error if doesn't exist. 
    (OPTIONAL: return `{ removed: true }` or `{ removed: false }`)
    * `PUT /<resource>/:id` - updates the resouce with supplied request body
* Use plural name in your url path (`/unicorns`, **not** `/unicorn`)

### Architecture and Design

* Use modules and project organization (files). There is now enough complexity that large, overly complicated modules 
will significantly impact your ability to focus on the task at hand. I recommed starting with the structure we used
in class.

* You are free to use the helper modules we created together and in-class. But please *re-type* them so you 
have a kinnesthetic/total physical response (TPR) learning experience.

## Testing

* Basic E2E with setup to manage db

## Bonus Ideas

* Implement handling the query part of the url in `GET` all as a mongo find query
* Add another resource type
  * SUPER BONUS: Generisize your first route handler into a general purpose
  handler by wrapping in a higher order function that takes a collection name

## Rubric

* Server, App, Project Organization: *2pt*
* Data
  * `GET` all: *2pt*
  * `POST`: *2pt*
  * `GET` by id: *2pt*
  * `PUT` by id: *2pt*
  * `DELETE` by id: *2pt*
* Tests
  * setup (with db drop) *3pts*
  * Each method *1pt* x 5 = *5pts*

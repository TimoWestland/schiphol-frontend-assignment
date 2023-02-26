# Remarks about this app

I wanted to showcase my preferred setup for building applications. It's a bit
overkill for this assignment alone, and I spend a bit more than 4 hours, but I
was having fun and wanted to add some additional things (and show off) :).

One thing was unclear to me from the assignment description which was whether
the flights should've been shown by default before the user searched for
flights, so I decided to show the entire list because the page was very empty
otherwise. The searching however done by an API call on the server instead of
filtering on the client like the description said.

## Technical considerations

#### Remix

I used remix as a framework to bootstrap my project. I could've used CRA or
Next.js, but I really like to work with Remix as it is build on top of
react-router, enforces the usage of existing browser APIs and has great
progressive enhancement (the basics of this app should work with javascript
disabled).

#### Tailwindcss

Although the assignment stated that the use of UI libraries had to be limited, I
still decided to use tailwindcss. I love tailwind as I think it's a great
productivity booster and works very well with building React components. Also,
atomic CSS will result in a much smaller CSS bundle as projects scale. Even
though I'm not showcasing pure CSS knowledge this way, the added productivity
helped me improve code in other places.

## Testing

I've added basic unit tests that should show three different types of unit
tests: react components, utility functions and async API call functions. I've
not written tests for all code as that was too much work, and I'm not a huge fan
of unit tests.

I think end2end tests add more value in a project, so I've also added a very
simple e2e test using playwright. You can run this by using `npm run test:e2e`.
If you get an error about missing modules you might need to run
`npm run test:e2e:install` first.

## PM2

I used PM2 to run some tasks in parallel as we need to compile both remix and
tailwind on changes. It's very similar to npm-run-parallel, but uses a config
file to describe the tasks to run and has a bit nicer CLI output IMO.

## Deployment

I deployed the app to fly.io, so it can also be viewed from there running in
production mode. There is a basic Dockerfile used for building the image that is
deployed. The app can be viewed here: https://assignment.fly.dev

## Other remarks

- The form components are a bit overkill for this application, but I thought
  this was an excellent place to show my React and accessibility knowledge.
- Same goes for the Grid component. I love working with CSS grid combined with
  react and tailwind, however there was not much to put on the grid for this
  app, so it's mainly used as a container to center the content on the page.
- I added some basic routing to the app as the cards looked very clickable and
  the flights.json items contained a URL property.
- Also added a way to display delayed flights to show some more React stuff.
- The app is fully responsive, so feel free to check it on smaller screens.

## If this was a real project

I wouldn't have done much differently than what I did in this application. I
think this setup can easily scale to much larger apps. I'm a big fan of flat
directory structures, fewer folders and more files with multiple
functions/components.

Some things I would add/change if I would spend more time on this:

- Split up the components a bit more. Mainly typography as I think all
  typography elements should come from components in react apps.
- Persist the user's search query onto the URL, so it will be kept when
  navigating between flight detail pages and back.
- Add clear/reset functionality to the search bar, so you could go back to the
  original results/view
- Add better error handling for 404 and server errors using Remix's
  ErrorBoundary and CatchBoundary
- Wrapped some low level components like the form elements in forwardRef, so you
  can still use refs on them.

## Original Assignment

Please create a page that contains an input field. When the user enters _at
least_ three characters into this input field, you should display all flight
information from the `flights.json` file where the destination airport matches
the entered input. Limit the search result to a maximum of 5 flights.

Please implement it using React. Try to keep it simple.

We think 4 hours should be enough to spend on this assignment. Please don't
spend more than that unless you're having fun and want to show off :)

## Requirements:

- Use React. Create your app with React but try to limit the use of third party
  UI libraries.
- Use Typescript. Make sure your app is typed correctly.
- Make it look nice. Make use of the provided colors. How you want to implement
  them is entirely your choice ;)
- Your application should treat the contents of `flights.json` as the output of
  an API endpoint. It should load this asynchronously using XHR or Fetch API and
  should not require a page reload when the user changes their input.
- Make sure the results are sortable. The filtered flight data should be
  sortable on date.

## Submission:

- Create a clone of this repository locally. Then push it to **your GitHub
  account** and continue working from there. Once you have finished, please send
  us the URL of the repository you have created.

### Some things to consider:

- We like DRY and KISS
- We like tested code
- We like readable code
- We like using the latest features of ES6 where applicable
- Last but not least, have fun!

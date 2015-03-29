# Homework Assignment

###Design and Technical Decisions

#####Architecture

Initially, given Ember's central role in CrowdStrike's UI stack and my interest in the framework, I thought about utilizing Ember to construct the Vehicle app.

I decided against that approach though.

(Aside: I have been immersed Ember for a while though. I've been developing a Math Quiz application in my spare time. 
I've deployed it on div shot [here](http://development.math-quiz-user-interface.divshot.io/teachers/1). The source code for the UI is [here](https://github.com/stgallagher/math_quiz_user_interface). The code for the JSON API is [here](https://github.com/stgallagher/timed_tests/tree/master/math_quiz_api))

I appreciate the advantages a good framework confers upon a developer. Any app of sufficient complexity is well-served by its features. But I find that it can be tempting to turn to a library or framework when something simpler can be just as effective, without the bloat or strictures that comes with using a library. 

So my next thought was to use a lighter-weight framework, something like SpineJS or RaptorJS. 

But the more I thought about the requirements, the more I became convinced that using just plain vanilla javascript would be the most efficient solution.

##### Inheritance and the revealing module pattern

In keeping with the idea of using plain javascript, I decided to forgo a compiled language like coffeescript and forgo `Class` abstractions altogether. I would use prototypal inheritance for the `Car` and `Motorcycle` objects to inherit from the `Vehicle` class. Further I would use the revealing module pattern to expose these objects and their interfaces.

With the data objects completed, the code then consisted of some element bindings, listeners, the required `attach` function and the function to pass into `attach`.

##### Design

In keeping with the minimal implementation, I went with the [pure](http://purecss.io/) css framework. It's very lightweight and has great defaults for basic elements without being too intrusive.

##### Testing

This was one of my favorite parts of this project. I had the opportunity to use [Nightwatch](http://nightwatchjs.org/) for my tests. With Nightwatch I could easily automate testing the various scenarios for the application, watching them play out in the browser.

### Weaknesses

There were a couple of unresolved weaknesses in my design that I noticed:

* I wanted to use the closures formed by the revealing module pattern to "hide" my data members and provide a public interface via the getters and setters in the returned object. This worked fine for the `Vehicle` class, but seemed to break prototypal inheritance when I attempted to have `Car` and `Motorcycle` inherit from `Vehicle`. I played around with it for awhile, but ultimately couldn't get inheritance working using closures without ugly hacks.
* While I have good integration tests via Nightwatch, I don't have any unit tests. There isn't many functions in my code that lend themselves well to unit testing, as most of the actual logic is tied to the DOM. That's probably because I have too much logic in my listeners. I could probably decompose them some, and then have more functional methods that are easier to unit test.

### Conclusion

This was a fun assignment and, at times, more difficult than I originally imagined. Although I could make some improvements, I am generally happy with the result. I deployed the app to an Amazon S3 instance [here](http://homework-vehicle.s3-website-us-west-1.amazonaws.com/). The source code can be found [here](https://github.com/stgallagher/homework). 

#Addendum

###Steps to run project

Simply pointing the browser to `index.html` should be sufficient to run the app.

Alternatively, you could browse to [here](http://homework-vehicle.s3-website-us-west-1.amazonaws.com/)

###Testing setup

Installation instructions are [here](http://nightwatchjs.org/guide#installation)

1. Install Nightwatch `npm install -g nightwatch`
	* _installing with `-g` allows test runner to run globally_
2. Install the selenium server [here](http://selenium-release.storage.googleapis.com/index.html)
	* _I used version 2.45_
3. In the terminal, go to the root project directory `homework`
4. Run the tests with `nightwatch --test tests/homework.js` 


### Git Diff Explanation

Here are the observations/issues I ran into while analysing this problem:

1. There was no data coming back from the ajax call.
	* I inserted a `success` callback and inspected the returned data. It was an empty object.
	* I recognized that the url was malformed. `/echo/json` should be `/echo/json/`. This resolved the data issue.

2. `console.log` statements showed that the second("`GOOD`") request was not even getting evaluated by the `isGood` function. Only the the first("`BAD`") request was evaluated.

3. I know that `setTimeout` calls are evaluated in the global scope, which explains why the first call was only getting evaluated.

4. I know `setTimeout` forms a closure with its enclosing scope, so I had access to `_request` (the `GOOD` request) in its function body.

5. I moved the `done()` callback for `_request` inside `setTimeout` and made sure the `isGood` evaluation took place after this second request was made. This allowed the second request to be evaluated properly and resolved the issue.

Also, there were a few typos and an unnecessary comma in the `json` data for the ajax call.

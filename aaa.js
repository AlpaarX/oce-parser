// Log all elements with class "sukejuuru" within the #scrollUl element

//   const sukejuuruElements = await page.$$("#scrollUl .sukejuuru");

//   for (const sukejuuruElement of sukejuuruElements) {
//     const sukejuuruContent = await page.evaluate(
//       (element) => element.textContent,
//       sukejuuruElement
//     );

//     // Extract relevant information from sukejuuruContent using a regular expression
//     const matchResult = sukejuuruContent.match(
//       /(\d{2}:\d{2} - \d{2}:\d{2}).*Lesson：(.*?)Student：(.*)/
//     );

//     if (matchResult) {
//       const timeRange = matchResult[1];
//       const lessonType = matchResult[2];
//       const studentName = matchResult[3];

//       // Format the string and log it
//       const formattedString = `${timeRange} ${lessonType} ${studentName}`;
//       console.log(formattedString);
//     } else {
//       console.log("Break");
//     }
//   }
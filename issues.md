Lesson1. Radio button error message.

Lesson 1 task 4. to expression tag for the task text.

Navigation. Add 'back' button to every page.

Registration. Remove 'c' char from registration code for the user and keep it for the data transfer.

Run. Use run task everywhere from Utils/fp-ts/Task.

Redirect. Encode redirect back url. Example:
/login?redirect-to=/teacher-panel/group/2ПрИн-5а.18/lesson/1

Return type. Inline return type into HttpService method.
before:
HttpService.get('/lesson/', returnType, req);
after:
HttpService.get('/lesson/', array(TLessonBasic), req);

getInitialProps. Get variables to const and then put to props object.  
before:
return {
  lessons: await fetchLessons(req)(),
};
after:
const lessons = await fetchLessons(req)();
return {
  lessons,
};

getInitialProps. Replace with getServerSideProps.

HttpService. Add subclasses for HttpError like ServerError, ClientError and
RedirectError.

Error. Create base classes like ErrorIdentifier and ErrorsIdentifier.

LessonPage. After submitting get results and redirect to ResultPage without
fetching results again. Suggest: use store.

Check this. https://www.npmjs.com/package/eslint-config-airbnb-typescript

Table. Edit validation messages before submit.

GroupTable. Merge first name and last name into full name and split back when
editing.

App. Remove trailing slash in url.

LessonsList. Alerts about success of fail the lesson.

Redirection. Show snackbars after any redirection with information about reason.

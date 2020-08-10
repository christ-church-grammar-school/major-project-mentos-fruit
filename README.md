## Major Project: CCGS Assistant

#### Repo Structure
- **NextJS Webapp**. Located under ```/ccgs-assistant```. Contains nearly all code relevant to the application. [Setup Instructions](https://github.com/christ-church-grammar-school/major-project-mentos-fruit/tree/master/ccgs-assistant).
- **Auth0**. Located under ```/auth0```. Webhooks have been setup so that any push to the ```/auth0``` directory will update on auth0 servers. Currently rules have been set up to update user profiles with information from the Microsoft Graph API. 
- **Design Resources**. Located under ```/Design Resources```. Contains all planning and UI design.

---

#### General Info - The Mentos Fruit Team

<details open>
<summary><b>Development Team</b></summary>

```Joshua Chen - Scrum Master``` :penguin:

```Roman Green - Doing everything``` :video_game:

```Kenneth Lo - Design Lead``` :penguin:
</details>

**App Category:** Productivity

**Target Audience:** CCGS staff and students

**Device(s):** Webapp – any device with a web browser (i.e. chromium based browser, safari or equivalent)

**Brief Overview:** The code powering the CCGS-Assistant application.

<details>
<summary><b>Project Summary</b></summary>


The main objective of this app is to provide   and easy-to-use voting system, specific to Christ Church Grammar School, that implements preferential voting. This would allow voters, including both students and staff, to automatically vote for the groups they are part of, including school, house, and boarding prefects.

As a secondary objective, the app will also serve as a student/teacher app, which allows students/teachers to easily set homework/assessment reminders, view their timetable and add events to a calendar. During the voting period of the year, an extra button will be temporarily available, allowing users to vote for prefects. The voting section will also be available as a separate web app , allowing students and staff to vote on either app.

The voting-only app is prioritised over the remaining aspects of the student/teacher app , as the current paper voting system is inefficient and outdated. Timetables, calendars and reminder apps exist; however, our app aims to combine this into a single app, specific to CCGS (e.g. automatically shows the user’s timetable on Nexus). Note that the features of the student/teacher app will therefore be classified as desirable, as this app will only be implemented once the voting-only app is completed.

Research and  Development Required:

    ReactJS, preferential voting system, databases

</details>

---

### Project Outline

<details>
<summary><b>Project Scope</b></summary>

The main problems our app combats are:
* The lack of an efficient, electronic, automatic voting system within the school.
* The lack of an electronic journal system, allowing students and teachers to record.

Our app will provide these services to **CCGS staff and students** , integrating both features into a single handy webapp. Furthermore, the voting system will also be available as a separate web app, for easier access.

</details>

<details>
<summary><b>Research</b></summary>

Our group conducted an interview with Mr Taylor, the ICT services co-ordinator. Notably, he mentioned that:

- The current problem with using a service such as Microsoft Forms is that the voter is able to put in a preference for one candidate more than once; I.e. Preference 1, 2, 3 = _Candidate A_.
- Currently, the school does not use an in-house solution.
    - Alternatives seem expensive.
- It is a preferential voting system, meaning that the person with the most amount of votes may not necessarily win.

We also interviewed Stanton-Cook, who facilitates voting at CCGS. Through this interview, we were given a list of aspects which our app needed to take into account. This includes:

- Our app should allow users to vote for their school, house and boarding prefects, depending on their house and whether they are a boarding prefect.
- All students have an equal voting power. Teachers have a voting power three times that of students.
- Student votes should be separated for each year group, and between students and staff. This is because:
    - In the past, some year groups have made a collaborative decision to vote for an unpopular candidate, and thus, this may not be reflective of strong candidates. 
    - Year 7s voting for Year 11s also provide useful information given that some of the Year 11s were Peer Support Leaders in their respective houses.
- Data should exported to a XLSX or CSV file to double-check candidates as above.
- When voting, a user should be able to see each candidate’s name, image and short biography. This is important as some students/staff may recognise peoples’ faces but not names.
- Candidates should be presented to each user randomly to avoid bias from ‘donkey votes’.
- Student data (e.g. year group, house, whether they are a boarding student) can be obtained from a database created by Mr Masetti, but not directly obtained from Synergetic databases.

Our group also conducted an interview with Mr Arthur. This includes:

- Using the OAuth2 token flow for authentication.

</details>

<details>
<summary><b>Use Cases</b></summary>

Clearly, the voting section will be used for determining school, house, and boarding prefects. However, the app may also be able to be tweaked to work for club committees, given that they also use a preferential voting system. Students/staff would need to be part of a club on Nexus for this to work.

The student/teacher app will be used on a daily basis, primarily to check the timetable, set homework / tests / deadlines / event reminders. Teachers can also use this app to remind them tasks such as marking tests, planning lessons and attending meetings.

</details>

<details>
<summary><b>Surplus Detail</b></summary>

**Functional Requirements**

```
Feature Description
[Be brief]
```
```
Research Needed & Why
[What you will you need to learn to implement each feature]
Authenticate user Check if user’s email and password are valid CCGS email accounts
```
- Need to research email validation / Outlook Mail API / Microsoft
    Graph API
Retrieve information about
user

```
Check details such as whether they are a student/staff, year group,
house, if they are a boarding student, etc.
```
- Need to research how to retrieve information from local school
    database or the Microsoft GRAPH API (Office 365 Users, Groups
    and Organisation data).
This is needed so that:
- The program can check which votes the user needs to cast, based
on their house and whether they are a boarding student/teacher
- Results can be grouped based on year level, etc. (necessary to
check that the results are fair)
- Teacher votes are separated from student votes.
- Automated tallying can occur.
User preferential voting.
(i.e., choose up to six
candidates in an order)
- Creating custom ReactJS forms.


```
Preferential vote result
tallying
```
- Automated tallying, taking into consideration voting power of
    students/staff
- Export data as xlsx or csv.

Scheduling voting sessions (^) • How to only allow votes during set timeframes.

- How to differentiate updating past voting data or creating new data.

**Non-Functional Requirements**

```
Feature Description
[Be brief]
```
```
Research Needed
[What you will you need to learn to implement each feature]
Allows user to select less
than six options
```
- Creating custom ReactJS forms.

```
Voting dashboard • Shows the votes which the user has yet to cast
```
- Need to store whether a user has completed a certain vote
Custom graphics • Creating nice art in Adobe Illustrator.

**Desirable Requirements**

(Keep in mind that all aspects of the student/teacher app are classified as desirable, as they will only be
implemented when the voting app is completed.)

```
Feature Description
[Be brief]
```
```
Research Needed
[What you will you need to learn to implement each feature]
```
Setup student/teacher app (^) • Design – placing all elements in a concise, easy-to-use manner.

- Linking pages.
Display user’s timetable
automatically
- Nexus web scraping or school database access.
- Caching responses in the event Nexus goes down. (Like normal).

Tasks/Diary (^) • Storing user data in a custom database.

- Server – User communication.
- Scheduling emails as reminders.
Campus map • Blender & ThreeJS: modelling the school, and drawing it in 3D
- If possible, obtain user’s location to show their location on the map
Settings • Allow user to select certain settings, such as theme and notifications

### Design Considerations

#### [User interface – how will users interact with your app? Touch screen/use of buttons/keyboard etc]

```
Technical requirements
```
```
Requirement Information
[Input/output requirements –
what information will need
be needed]
```
- User information will be required
    o A personalised dashboard for every student/staff member that
       uses it
    o The timetable for every user
    o Tasks that are added to the diary (to be synced across devices)
    o Calendar entries are retrieved from our database (synced across
       devices)
**[Hardware requirements –
minimum device**
- Client side
o Any device that has a web browser (i.e. chromium-based


**specifications, other
infrastructure required]**

```
browser, safari or equivalent)
```
- Server side
    o A virtual machine with networking capabilities
    o Has access to existing infrastructure for client information
**[Development requirements
- software/hardware
required for development,
infrastructure for testing]**
- Hardware/Software required for development/testing purposes
o A laptop or desktop running Windows or macOS
o A device without restrictions when starting the react app
o A device that can quickly deploy/run the react app
**[User Input Methods** • Optimised for web inputs
o I.e. Touch, cursor, keyboard

```
Development constraints
```
**Requirement Information
[Skills required]** • A solid understanding in the foundations of web development
o Understanding in ReactJS, HTML, JavaScript, CSS and JSX.
o Understanding in ExpressJS, API development, server
scheduling and database management.
o OAuth 2 (Microsoft single-sign-in)
**[Resourcing – what do you
need to do the
development]**

- Information that is provided by past and future interviewees
    regarding app functionality
       o I.e. How the voting system should work
       o What functions must it do
       o Etc.
- Access to online resources/documentation for development
- A thorough understanding of the schools infrastructure regarding
    student management.
**[Access to required
information]
[Infrastructure
requirements – eg access
to servers, use of location
services]**
- Access to the synergetic database for certain user data
o Retrieving user timetables associated with the account
o User data such as profile images
- Access to our own database for other user data
o Diary information
- Access to Microsoft Azure for calendar syncing with email
**[Ethical/legal issues – eg
storage of personal
information]**

**[Possible Issues]**

- Issues with user information being stored in a database
    o Students/staff may be sceptical of the application since they
       would be required to upload data such as diary entries for
       tasks
    o Possible security risk of data being leaked
- Accessing user data from the synergetic database may pose as a
    risk
       o Information may be leaked from copying or deleted
       o May breach privacy/data protection act

### Detailed Description

```
{Exactly what does the program do and what happens in different parts of the program.] [Screen by
screen description of what is going to happen at each stage of the program. This
should also include what will happen when particular buttons are pressed or an error occurs (e.g. suer
enters incorrect password)]
```
```
The purpose of the program is to implement an integrated voting solution within the student/staff
assistant app. The program will be split up into the following components:
```
**UI Screen/Section Description**


**Login** Sign in will be handled with Microsoft’s single sign on system, meaning that once
they have signed in via Microsoft on another application using this system, they will
stay logged in on our app.

**Dashboard** The dashboard will feature a screen that will display important information for the
user, such as that day’s timetable and tasks/assessments that are due. Other
information such as the daily bulletin or notices will also be displayed.

**Diary** The diary will allow the user to input tasks/assessments that will be saved and
synced across their devices. It will also display the upcoming tasks/assessments that
have been added and will be displayed in a list format.

**Timetable** The timetable will retrieve the user’s timetable from the school’s synergetic
database (or via web scraping) and display it. This will continue to function in the
unlikely event of nexus being not operational, so that students/staff can still see
what classes they have.

**Campus Map** The campus map will provide an interactive 3D map of the school, so that the user
can locate their classrooms with ease.

**School
information**

This tab will provide a page with links to documents such as the school’s code of
conduct, school hymn, uniform expectations, etc. Each document will be opened
and displayed as a pdf in a new tab.

**Voting system** This tab will open the homepage of our voting system. This will show information on
why and how to vote using this solution. It will also show the current votes that the
user has yet to cast, and clicking on these will lead the user to the voting page where
they can select candidates.

**Options** The options page will display the settings that can be changed for the user. This may
include the ability to:

1. Change the theme
2. Turn on notifications (system or email) for upcoming tasks/assessments

**Login** The application should use Microsoft single sign in. If the user is logged out they will
be greeted by the familiar Microsoft sign in website.

```
If an error occurs in the application, it will display a prompt to the user containing information on steps to
resolve the issue.
```
```
We will also attempt to implement automatic error logging on both server and client devices.
```
### UI Design

```
Will use elements of Microsoft fluent design accompanied by a flat material style. We will also adopt a
light blue colour scheme with additional use of gradients.
```
```
Primary fonts to be used are:
```
- Bahnschrift
- Futura
We have also redesigned the CCGS logo to fit in with our colour scheme.

```
The mockups are available below.
Please see wireframe sketches in onenote.
```





### Milestones

**Task Estimated Completion Time**
Understand school infrastructure

- How does CCGS store all its data?
- Which data would we get access to?
- Which online services does CCGS use?
- Do those services have an API?

```
2 Weeks.
```
Create server infrastructure

- Should be able to pull all necessary data.
- Should have automatic scheduling.
- Should have full error logging.
- Expose API endpoints for ReactJS application.

```
5 Weeks.
```

Complete ReactJS Preferential Voting UI

- Should separate nominees into categories based on their
    potential positions.
- Should clearly illustrate to the user how voting will work.
- Votes should be able to be updated after initial selection and
    before the scheduled voting period ends.

```
2 Weeks.
```
Complete ReactJS Fake Nexus UI

- Dashboard (Show upcoming diary tasks, todays classes and
    important notices)
- Classes (Scraped probably from Nexus)
- Diary (Tasks will be stored on local school servers)
- Campus Map (School will be modelled in Blender and rendered on
    user devices using Three.JS)
- Settings (Assorted settings like font, email reminders, etc.)
- Prefect Voting tab that will open a minimised version of the
    above.

```
4 Weeks.
```

Original Mock-ups (In no particular order) (old)


These were some exploratory designs that the team had put together, in order to experiment with colours and scale.


</details>

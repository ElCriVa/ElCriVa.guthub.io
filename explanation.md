This is my Portfolio submission for DIG 4639C. I chose to make a new project with at least three components. I made a working version of a journaling app called the Check In.
The app has four screens/components. Each screen has a different function.

    The log in screen is where a user types in their email and password to log in or can click a button to register. Once logged in they move on to the Home Screen.

    The register screen is where a user can make an account using an email and passowrd. They will then be redirected to log in. 

    The home screen displays the titles of any saved entries. The homescreen also has a button that allows users to create a new entry.

    The new entry screen is where a user can type in their entry title and type in body text for their entry. They can then click the save button to save their entry and return to the homescreen. 

The log in and Register screen require the user to input to be in the form of an email before continuing. There are three state variables used within these two components; 'email', 'password', and 'error'. 
The homescreen and new entry screens use useState to change the title paramater to the title that is entered by the user to then be displayed on the home screen. The new entry also uses useState to display an error message if the user tries to save an entry without a title. 

The main function uses NavigationContainer and Stack.Navigator to navigate through the different screens. The four other functions create the screens which are then passed to the default function. 
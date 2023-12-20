/* eslint-disable quotes */
describe("Note app", function () {
    function registerUser(email: string, name: string, password: string) {
        // clear the form
        cy.get('input[type="email"]').clear();
        cy.get('input[type="text"]').clear();
        cy.get('input[type="password"]').clear();

        // Fill in the form
        if (email) cy.get('input[type="email"]').type(email);
        if (name) cy.get('input[type="text"]').type(name);
        if (password) cy.get('input[type="password"]').type(password);

        // Click the register button
        cy.get("button").contains("Register").click();
    }

    function loginUser(email: string, password: string) {
        // clear the form
        cy.get('input[type="email"]').clear();
        cy.get('input[type="password"]').clear();

        // Fill in the form
        if (email) cy.get('input[type="email"]').type(email);
        if (password) cy.get('input[type="password"]').type(password);

        // Click the login button
        cy.get("button").contains("Sign in").click();
    }

    function logoutUser() {
        cy.get("body").then(($body) => {
            if ($body.find(".userAvatar").length > 0) {
                // Open the dropdown menu
                cy.get(".userAvatar").click();
                // Wait for the dropdown to open and the logout button to become visible
                cy.get(".logoutButton").should("be.visible");
                // Click the logout button
                cy.get(".logoutButton").click();
            }
        });
    }

    beforeEach(function () {
        // logout user
        logoutUser();
        // reset the database
        cy.request("http://localhost:3000/api/testing/reset")
            .its("status")
            .should("eq", 200)
            .clearAllCookies()
            .clearLocalStorage()
            .clearAllSessionStorage()
            .reload();

        cy.visit("/");
        cy.contains("Using testing environment", { timeout: 6000 }).should("be.visible");
    });

    describe("LandingPage", () => {
        it("front page requires to login/registeration", function () {
            cy.visit("/");
            cy.contains("Please login to use the application");
            cy.contains("Login");
            cy.contains("Create account");
            cy.get("#addNoteButton").should("not.exist");
        });

        describe("RegisterPage", () => {
            beforeEach(() => {
                // Visit the register page before each test
                cy.visit("/register");
            });

            it("should render the register form", () => {
                cy.get('input[type="email"]');
                cy.get('input[type="text"]');
                cy.get('input[type="password"]');
                cy.get("button").contains("Register");
            });

            it("registeration works", () => {
                registerUser("testuser@gmail.com", "Test User", "password123");
                cy.contains("Registered successfully!", { timeout: 6000 }).should("be.visible");
                cy.contains("There are 0 note(s)");
            });

            it("registeration fails if email is already taken", () => {
                registerUser("testuser@gmail.com", "Test User", "password123");
                cy.contains("Registered successfully!", { timeout: 6000 }).should("be.visible");
                cy.contains("There are 0 note(s)");

                logoutUser();

                cy.contains("Please login to use the application");
                cy.contains("Login");
                cy.contains("Create account");
                cy.get("#addNoteButton").should("not.exist");
                cy.visit("/register");
                registerUser("testuser@gmail.com", "Test User", "password123");
                cy.contains("Email already in use");
            });

            it("registeration fails if email is invalid", () => {
                registerUser("testuser", "Test User", "password123");
                cy.contains("Invalid email");
            });

            it("registeration fails if password is weak", () => {
                registerUser("testuser@gmail.com", "Test User", "pass");
                cy.contains("Weak password.");
            });

            it("registeration fails if email, name or password is empty", () => {
                registerUser("", "Test user", "password123");
                cy.contains("Please fill in all the fields.");
                registerUser("testuser@gmail.com", "", "password123");
                cy.contains("Please fill in all the fields.");
                registerUser("testuser@gmail.com", "Test user", "");
                cy.contains("Please fill in all the fields.");
            });
        });

        describe("LoginPage", () => {
            beforeEach(() => {
                // create user before each test
                cy.visit("/register");
                registerUser("testuser@gmail.com", "Test user", "password123");
                cy.contains("Registered successfully!", { timeout: 6000 }).should("be.visible");
                cy.wait(1000);
                cy.contains("There are 0 note(s)");

                logoutUser();
                // Visit the login page before each test
                cy.visit("/login");
            });

            it("should render the login form", () => {
                cy.contains("Sign in to your account");
                cy.get('input[type="email"]');
                cy.get('input[type="password"]');
                cy.get("button").contains("Sign in");
            });

            it("login works", () => {
                loginUser("testuser@gmail.com", "password123");
                cy.contains("Logged in successfully!", { timeout: 6000 }).should("be.visible");

                cy.contains("There are 0 note(s)");
            });

            it("login fails if email is invalid", () => {
                loginUser("testuser", "password123");
                cy.contains("Invalid email.");
            });

            it("login fails if password is weak", () => {
                loginUser("testuser@gmail.com", "pass");
                cy.contains("Invalid credentials.");
            });

            it("login fails if email or password is empty", () => {
                loginUser("", "password123");
                cy.contains("Invalid email.");
                loginUser("testuser@gmail.com", "");
                cy.contains("Please fill in all the fields.");
            });

            it("login fails if user does not exist", () => {
                loginUser("notregistered@gmail.com", "password123");
                cy.contains("Invalid credentials", { timeout: 6000 }).should("be.visible");
            });
        });
    });

    describe("NotePage (when logged in)", () => {
        beforeEach(() => {
            // create user before each test
            cy.visit("/register");
            registerUser("testuser@gmail.com", "Test user", "password123");
            cy.wait(1000);
            cy.contains("Registered successfully!", { timeout: 6000 }).should("be.visible");
        });

        it("should render the note page", () => {
            cy.contains("There are 0 note(s)");
            cy.get("#addNoteButton").should("be.visible");
        });

        it("should add a note", () => {
            cy.get("#addNoteButton").click();

            cy.get("#noteTitle").type("Test note");
            cy.get("#noteContent").type("Test note content");
            // has to wait for the search results to load
            cy.get(".mapboxgl-ctrl-geocoder--input").type("Tampere").wait(1000).type("{enter}");
            cy.get("#saveNoteButton").click();

            cy.contains("There are 1 note(s)");
            cy.contains("Test note");
            cy.contains("Test note content");
        });

        describe("when there is a note", () => {
            beforeEach(() => {
                cy.get("#addNoteButton").click();

                cy.get("#noteTitle").type("Test note by test user");
                cy.get("#noteContent").type("Test note content");
                // has to wait for the search results to load
                cy.get(".mapboxgl-ctrl-geocoder--input").type("Tampere").wait(1000).type("{enter}");
                cy.get("#saveNoteButton").click();

                cy.contains("There are 1 note(s)");
                cy.contains("Test note by test user");
                cy.contains("Test note content");
            });

            it("you can add another note", () => {
                cy.get("#addNoteButton").click();

                cy.get("#noteTitle").type("Another note by test user");
                cy.get("#noteContent").type("Another note content");
                // has to wait for the search results to load
                cy.get(".mapboxgl-ctrl-geocoder--input").type("Tampere").wait(1000).type("{enter}");
                cy.get("#saveNoteButton").click();

                cy.contains("There are 2 note(s)");
                cy.contains("Another note by test user");
                cy.contains("Another note content");
            });

            it("you can edit the note", () => {
                cy.get('[id^="toNoteButton"]').click();
                cy.contains("edit note").click();

                cy.get("#noteTitle").clear().type("Edited note by test user");
                cy.get("#noteContent").clear().type("Edited note content");
                cy.get("#editNoteButton").click();

                cy.visit("/");

                cy.contains("There are 1 note(s)");
                cy.contains("Edited note by test user");
                cy.contains("Edited note content");
            });

            it("you can delete the note", () => {
                cy.get('[id^="toNoteButton"]').click();
                cy.contains("delete note").click();
                // cy.contains("Are you sure you want to delete this note?");
                // cy.contains("Yes").click();
                cy.contains("Note deleted successfully", { timeout: 6000 }).should("be.visible");
                cy.contains("There are 0 note(s)");
            });

            it("notes don't show afte user logs out", () => {
                logoutUser();
                cy.contains("Please login to use the application");
                cy.contains("Login");
                cy.contains("Create account");
                cy.get("#addNoteButton").should("not.exist");
            });
        });
    });
});

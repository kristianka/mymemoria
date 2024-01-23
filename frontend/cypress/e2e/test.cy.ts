/* eslint-disable quotes */
describe("Note app", function () {
    let CYPRESS_TEST_EMAIL = Cypress.env("CYPRESS_TEST_EMAIL");
    // if CYPRESS_TEST_EMAIL is undefined, try to get it from environment variables
    if (!CYPRESS_TEST_EMAIL) {
        CYPRESS_TEST_EMAIL = process.env.CYPRESS_TEST_EMAIL;
    }
    // if CYPRESS_TEST_EMAIL is still undefined, throw an error
    if (!CYPRESS_TEST_EMAIL) {
        throw new Error("CYPRESS_TEST_EMAIL environment variable is not set.");
    }

    function registerUser(email: string, name: string, password: string) {
        // clear the form
        cy.get('input[type="email"]').clear();
        cy.get('input[type="text"]').clear();
        cy.get("#password").clear();
        cy.get("#confirmPassword").clear();

        // Fill in the form
        if (email) cy.get('input[type="email"]').type(email);
        if (name) cy.get('input[type="text"]').type(name);
        if (password) {
            cy.get("#password").type(password);
            cy.get("#confirmPassword").type(password);
        }

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
            if ($body.find("#dropdownMenu").length > 0) {
                // Open the dropdown menu
                cy.get("#dropdownMenu").click();
                // Wait for the dropdown to open and the logout button to become visible
                cy.get(".logoutButton").should("be.visible");
                // Click the logout button
                cy.get(".logoutButton").click();
                cy.contains("Logged out successfully. 👋", { timeout: 6000 }).should("be.visible");
            }
        });
    }

    beforeEach(function () {
        // check that we are in testing env
        cy.visit("/");
        cy.contains("Using testing environment", { timeout: 6000 }).should("be.visible");
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
    });

    describe("LandingPage", () => {
        it("front page requires to login/registeration", function () {
            cy.visit("/");
            cy.contains("Please sign in to use the application");
            cy.contains("Sign in");
            cy.contains("Create account");
            cy.get("#addNoteButton").should("not.exist");
        });

        describe("RegisterPage", () => {
            beforeEach(() => {
                // Visit the register page before each test
                cy.visit("/register");
            });

            it("registeration form renders", () => {
                cy.get('input[type="email"]');
                cy.get('input[type="text"]');
                cy.get('input[type="password"]');
                cy.get("button").contains("Register");
            });

            it("registeration works", () => {
                registerUser(CYPRESS_TEST_EMAIL, "Test User", "password123");
                cy.contains("Registered successfully!", { timeout: 6000 }).should("be.visible");
                cy.contains("No notes yet");
            });

            it("registeration fails if email is already taken", () => {
                registerUser(CYPRESS_TEST_EMAIL, "Test User", "password123");
                cy.contains("Registered successfully!", { timeout: 6000 }).should("be.visible");
                cy.contains("No notes yet");

                logoutUser();

                cy.contains("Please sign in to use the application");
                cy.contains("Sign in");
                cy.contains("Create account");
                cy.get("#addNoteButton").should("not.exist");
                cy.visit("/register");
                registerUser(CYPRESS_TEST_EMAIL, "Test User", "password123");
                cy.contains("Email already in use");
            });

            it("registeration fails if email is invalid", () => {
                registerUser("testuser", "Test User", "password123");
                cy.contains("Invalid email");
            });

            it("registeration fails if password is weak", () => {
                registerUser(CYPRESS_TEST_EMAIL, "Test User", "pass");
                cy.contains("Weak password.");
            });

            it("registeration fails if email, name or password is empty", () => {
                registerUser("", "Test user", "password123");
                cy.contains("Please fill in all the fields.");
                registerUser(CYPRESS_TEST_EMAIL, "", "password123");
                cy.contains("Please fill in all the fields.");
                registerUser(CYPRESS_TEST_EMAIL, "Test user", "");
                cy.contains("Please fill in all the fields.");
            });
        });

        describe("LoginPage", () => {
            beforeEach(() => {
                // create user before each test
                cy.visit("/register");
                registerUser(CYPRESS_TEST_EMAIL, "Test user", "password123");
                cy.contains("Registered successfully!", { timeout: 6000 }).should("be.visible");
                cy.wait(1000);
                cy.contains("No notes yet");

                logoutUser();
                // Visit the login page before each test
                cy.visit("/login");
            });

            it("login form renders", () => {
                cy.contains("Sign in to your account");
                cy.get('input[type="email"]');
                cy.get('input[type="password"]');
                cy.get("button").contains("Sign in");
            });

            it("login works", () => {
                loginUser(CYPRESS_TEST_EMAIL, "password123");
                cy.contains("Logged in successfully!", { timeout: 6000 }).should("be.visible");

                cy.contains("No notes yet");
            });

            it("login fails if email is invalid", () => {
                loginUser("testuser", "password123");
                cy.contains("Invalid email.");
            });

            it("login fails if password is weak", () => {
                loginUser(CYPRESS_TEST_EMAIL, "pass");
                cy.contains("Invalid credentials.");
            });

            it("login fails if password is incorrect", () => {
                loginUser(CYPRESS_TEST_EMAIL, "password1234");
                cy.contains("Invalid credentials", { timeout: 6000 }).should("be.visible");
            });

            it("login fails if email or password is empty", () => {
                loginUser("", "password123");
                cy.contains("Invalid email.");
                loginUser(CYPRESS_TEST_EMAIL, "");
                cy.contains("Please fill in all the fields.");
            });

            it("login fails if user does not exist", () => {
                loginUser("notregistered@gmail.com", "password123");
                cy.contains("Invalid credentials", { timeout: 6000 }).should("be.visible");
            });

            it("user can reset password", () => {
                cy.get('input[type="email"]').clear();
                cy.get('input[type="email"]').type(CYPRESS_TEST_EMAIL);
                cy.contains("Reset password").click();
                cy.contains("Password reset email sent.", { timeout: 6000 }).should("be.visible");
            });
        });
    });

    describe("When logged in", () => {
        beforeEach(() => {
            // create user before each test
            cy.visit("/register");
            registerUser(CYPRESS_TEST_EMAIL, "Test user", "password123");
            cy.wait(1000);
            cy.contains("Registered successfully!", { timeout: 6000 }).should("be.visible");
        });

        describe("Note page", () => {
            it("note page renders", () => {
                cy.contains("No notes yet");
                cy.get("#addNoteButton").should("be.visible");
            });

            it("user can add a note", () => {
                cy.get("#addNoteButton").click();

                cy.get("#noteTitle").type("Test note");
                cy.get("#noteContent").type("Test note content");
                // has to wait for the search results to load
                cy.get(".mapboxgl-ctrl-geocoder--input").type("Tampere").wait(1000).type("{enter}");
                cy.get("#saveNoteButton").click();

                cy.contains("You have 1 notes");
                cy.contains("Test note");
                cy.contains("Test note content");
            });

            describe("when there is a note", () => {
                beforeEach(() => {
                    cy.get("#addNoteButton").click();

                    cy.get("#noteTitle").type("Test note by test user");
                    cy.get("#noteContent").type("Test note content");
                    // has to wait for the search results to load
                    cy.get(".mapboxgl-ctrl-geocoder--input")
                        .type("Tampere")
                        .wait(1000)
                        .type("{enter}");
                    cy.get("#saveNoteButton").click();

                    cy.contains("You have 1 notes");
                    cy.contains("Test note by test user");
                    cy.contains("Test note content");
                });

                it("you can add another note", () => {
                    cy.get("#addNoteButton").click();

                    cy.get("#noteTitle").type("Another note by test user");
                    cy.get("#noteContent").type("Another note content");
                    // has to wait for the search results to load
                    cy.get(".mapboxgl-ctrl-geocoder--input")
                        .type("Tampere")
                        .wait(1000)
                        .type("{enter}");
                    cy.get("#saveNoteButton").click();

                    cy.contains("You have 2 notes");
                    cy.contains("Another note by test user");
                    cy.contains("Another note content");
                });

                it("you can open the note", () => {
                    cy.get('[id^="toNoteButton"]').click();
                    cy.contains("Test note by test user");
                    cy.contains("Test note content");
                });

                it("you can edit the note", () => {
                    cy.get('[id^="toNoteButton"]').click();
                    cy.contains("Edit note").click();

                    cy.get("#noteTitle").clear().type("Edited note by test user");
                    cy.get("#noteContent").clear().type("Edited note content");
                    cy.get("#editNoteButton").click();

                    cy.visit("/");

                    cy.contains("You have 1 notes");
                    cy.contains("Edited note by test user");
                    cy.contains("Edited note content");
                });

                it("you can delete the note", () => {
                    cy.get('[id^="toNoteButton"]').click();
                    cy.contains("Delete note").click();
                    // cy.contains("Are you sure you want to delete this note?");
                    // cy.contains("Yes").click();
                    cy.contains("Note deleted successfully", { timeout: 6000 }).should(
                        "be.visible"
                    );
                    cy.contains("No notes yet");
                });

                it("notes don't show after user logs out", () => {
                    logoutUser();
                    cy.contains("Please sign in to use the application");
                    cy.contains("Sign in");
                    cy.contains("Create account");
                    cy.get("#addNoteButton").should("not.exist");
                });
            });
        });

        describe("Profile page", () => {
            beforeEach(() => {
                cy.visit("/profile");
            });

            it("profile page renders", () => {
                cy.contains("Profile");
                cy.contains("Test user");
                cy.contains(CYPRESS_TEST_EMAIL);
                cy.get("#defaultLocation").should("not.exist");
                cy.get("#editNameButton").should("be.visible");
                cy.get("#deleteAccountButton").should("be.visible");
            });

            it("user can change their name", () => {
                cy.get("#editNameButton").click();
                cy.get("#name").clear().type("Edited name");
                cy.get("#updateNameButton").click();
                cy.contains("Name updated successfully!", { timeout: 6000 }).should("be.visible");
                cy.contains("Edited name");
            });

            it("user can delete their account", () => {
                cy.get("#deleteAccountButton").click();
                // alert doesn't popup with cypress so we have to click the button
                cy.contains("Account deleted successfully.", { timeout: 6000 }).should(
                    "be.visible"
                );
                cy.contains("Please sign in to use the application");
                cy.contains("Sign in");
                cy.contains("Create account");
                cy.get("#addNoteButton").should("not.exist");
            });
        });

        describe("Settings page", () => {
            beforeEach(() => {
                cy.visit("/settings");
            });

            it("settings page renders", () => {
                cy.contains("Settings");
                // has to wait for the search results to load
                cy.get(".mapboxgl-ctrl-geocoder--input").should("be.visible");
                cy.get("#saveLocationButton").should("be.visible");
            });

            it("user can change their default location", () => {
                cy.get(".mapboxgl-ctrl-geocoder--input").type("Tampere").wait(1000).type("{enter}");
                cy.get("#saveLocationButton").click();
                cy.contains("Default map location updated successfully!", { timeout: 6000 }).should(
                    "be.visible"
                );
            });
        });
    });

    describe("Redirected to front page when not logged in", () => {
        it("note page redirects to front page", () => {
            cy.visit("/notes");
            cy.contains("Please sign in to use the application");
            cy.contains("Sign in");
            cy.contains("Create account");
            cy.get("#addNoteButton").should("not.exist");
        });

        it("add note page redirects to front page", () => {
            cy.visit("/notes/add");
            cy.contains("Please sign in to use the application");
            cy.contains("Sign in");
            cy.contains("Create account");
            cy.get("#addNoteButton").should("not.exist");
        });

        it("profile page redirects to front page", () => {
            cy.visit("/profile");
            cy.contains("Please sign in to use the application");
            cy.contains("Sign in");
            cy.contains("Create account");
            cy.get("#addNoteButton").should("not.exist");
        });

        it("settings page redirects to front page", () => {
            cy.visit("/settings");
            cy.contains("Please sign in to use the application");
            cy.contains("Sign in");
            cy.contains("Create account");
            cy.get("#addNoteButton").should("not.exist");
        });
    });
});

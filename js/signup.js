document.getElementById("addDataForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("newemail").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("psw").value;
    const confirmpassword = document.getElementById("psw-repeat").value;


    if (password.length < 6) {
        alert("Error registering user: Password should be at least 6 characters");
    } else {
        if(password==confirmpassword){
            try {
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;
                await user.updateProfile({
                    displayName: username
                });
                await db.collection("users").doc(user.uid).set({
                    displayName: username,
                    email: email
                });
                alert("User registered successfully!");
                window.location.pathname = "../pages/loginandsignup.html";
                document.getElementById("addDataForm").reset();
            } catch (error) {
                console.error("Error registering user:", error);
                alert("Error registering user. Please try again.");
            }
        }else{
            alert("Confirm Password Not Match.");
        }
    }
});
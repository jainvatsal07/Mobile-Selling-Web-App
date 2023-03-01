function login() {
    // Get input values
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Check if inputs are not empty
    if (username === "" || password === "") {
      alert("Please enter your username and password");
    } else {
      // Send login data to server
      // Example code:
      /*
      fetch('http://example.com/api/login', {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Redirect to dashboard page
          window.location.href = "dashboard.html";
        } else {
          alert("Invalid username or password");
        }
      })
      .catch(error => console.error(error));
      */
    }
  }
  
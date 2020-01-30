<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<template>
  <div id="connection">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <div class="container register-form">
      <div class="form">
        <div class="note">
          <p>This is a simpleRegister Form made using Boostrap.</p>
        </div>

        <div class="form-content">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Your Name *" value=""/>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Phone Number *" value=""/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Your Password *" value=""/>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Confirm Password *" value=""/>
              </div>
            </div>
          </div>
          <button type="button" class="btnSubmit">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

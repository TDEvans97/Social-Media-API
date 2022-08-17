// router from express 

const {
    // all of your user controllers
    // getUsers
    // createUser
} =// required from controllers

// set up routes
router.route('/').get(getUsers).post(createUser)

// export

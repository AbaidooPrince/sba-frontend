const results = [
  {
    path: "/results/student/new",
    name: "NewStudentResults",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/*results*/ "../views/NewResultsView.vue"),
    meta: {
      auth: true,
    },
  },
];

export default results;

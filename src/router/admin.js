export default [
  {
    path: "/admin/classes",
    name: "ManageClasses",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/*results*/ "../views/admin/ClassManagerView.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/admin/courses",
    name: "ManageCourses",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/*courses*/ "../views/admin/CourseManagerView.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/admin/semesters",
    name: "ManageSemester",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/*courses*/ "../views/admin/SemesterManagerView.vue"),
    meta: {
      auth: true,
    },
  },
];

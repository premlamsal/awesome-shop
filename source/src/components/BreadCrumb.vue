<template>
  <div class="custom-breadcrumb">
    <ul>
      <div class="container-fluid">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Pictures</a>
        </li>
        <li>
          <a href="#">Summer 15</a>
        </li>
        <li>Italy</li>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  name: "BreadCrumb"
};
</script>
<style scoped>
.custom-breadcrumb ul {
  padding: 10px 16px;
  list-style: none;
  /* background-color: #eee; */
}
.custom-breadcrumb ul li {
  display: inline;
  font-size: 18px;
  color: #DC143C;
}
.custom-breadcrumb ul li + li:before {
  padding: 8px;
  color: #DC143C;
  content: "/\00a0";
}
.custom-breadcrumb ul li a {
  color: black;
  text-decoration: none;
}
.custom-breadcrumb ul li a:hover {
  color: #01447e;
  /* text-decoration: underline; */
}
</style>
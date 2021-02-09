<template>
  <div class="navbar-custom">
    <div class="inside-nav">
    <div class="container">
      <div class="menu-item" v-for="menu in menus" :key="menu.id">
        <div class="dropdown-custom" v-if="menu.childs.length!=0">
          <button class="dropbtn-custom">
            {{menu.title}}
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content-custom">
            <!-- <div class="header-custom">
        <h2>{{menu.title}}</h2>
            </div>-->
            <div class="has-sub-menu">
              <SubMenu v-bind:childs="menu.childs" />
            </div>
          </div>
        </div>
        <div class="nodrop-down" v-else>
          <a v-bind:href="menu.link">{{menu.title}}</a>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import SubMenu from "../menu/SubMenu";
export default {
  name: "Menu",
  components: {
    SubMenu
  },
  props: {
    menus: Array
  }
};
</script>
<style>
.navbar-custom {
    overflow: hidden;
    background-color: #DC143C;
    /* border-bottom: 1px solid #0080004f; */
    box-shadow: 1px 2px 11px -3px rgba(124, 179, 66, 0.68);
}

.navbar-custom a {
  float: left;
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none !important;
  transition: 0.5s;
}

.dropdown-custom {
  float: left;
  overflow: hidden;
}

.dropdown-custom .dropbtn-custom {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  opacity: 0.8;
  padding: 14px 16px;
  background-color: inherit;
  font: inherit;
  margin: 0;
}

.navbar-custom a:hover,
.dropdown-custom:hover .dropbtn-custom {
  color: white;
  opacity: 1;
}


.dropdown-content-custom {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  width: 100%;
  left: 0;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.dropdown-content-custom .header-custom {
  background: red;
  padding: 16px;
  color: white;
}

.dropdown-custom:hover .dropdown-content-custom {
  display: block;
}

/* Create three equal columns that floats next to each other */
.column-custom {
  float: left;
  /* width: 33.33%; */
  width: 20%;
  padding: 10px;
  /* background-color: #eee; */
  height: 250px;
  color:#DC143C;
}

.column-custom a {
  float: none;
  color: black;
  /* padding: 16px; */
  padding: 0;
  text-decoration: none;
  /* display: block; */
  text-align: left;
}

.column-custom a:hover {
  /* background-color: #ddd; */
  text-decoration: none !important;
}

/* Clear floats after the columns */
.row-custom:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column-custom {
    width: 100%;
    height: auto;
  }

}
</style>

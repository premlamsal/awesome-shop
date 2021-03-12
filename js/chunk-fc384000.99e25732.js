(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fc384000"],{"014a":function(e,s,t){},"8dd2":function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("b-container",{staticClass:"mt-5"},[t("div",{staticClass:"content"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-4"},[t("div",{staticClass:"card card-user"},[t("div",{staticClass:"image"}),t("div",{staticClass:"card-body"},[t("div",{staticClass:"author"},[t("img",{staticClass:"avatar border-gray",attrs:{src:e.user.image}}),t("h5",{staticClass:"title"},[e._v(" "+e._s(e.user.firstname)+" "+e._s(e.user.lastname)+" ")]),t("h6",{staticClass:"text-muted"},[e._v(e._s(e.user.email))]),t("p",{staticClass:"description text-muted"})])]),t("div",{staticClass:"card-footer text-muted"},[t("h5",{staticClass:"balance"},[e._v("Rs. "+e._s(e.user.balance))])])])]),t("div",{staticClass:"col-md-8"},[t("div",{staticClass:"card card-user"},[t("div",{staticClass:"card-header"},[t("h5",{staticClass:"card-title"},[e._v("Edit Profile")])]),t("div",{staticClass:"card-body"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-7 pr-1"},[t("div",{staticClass:"form-group"},[t("label",{attrs:{for:"exampleInputEmail1"}},[e._v("Email address")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.email,expression:"user.email"}],staticClass:"form-control",attrs:{type:"email",placeholder:"Email"},domProps:{value:e.user.email},on:{input:function(s){s.target.composing||e.$set(e.user,"email",s.target.value)}}})])]),t("div",{staticClass:"col-md-5 pl-1"},[t("div",{staticClass:"form-group"},[t("label",{attrs:{for:"exampleInputPhone"}},[e._v("Phone")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.details.phone,expression:"user.details.phone"}],staticClass:"form-control",attrs:{type:"phone",placeholder:"Phone"},domProps:{value:e.user.details.phone},on:{input:function(s){s.target.composing||e.$set(e.user.details,"phone",s.target.value)}}}),e.errors["details.phone"]?t("span",{class:["errorText"]},[e._v(e._s(e.errors["details.phone"][0]))]):e._e()])])]),t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-6 pr-1"},[t("div",{staticClass:"form-group"},[t("label",[e._v("First Name")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.firstname,expression:"user.firstname"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Company"},domProps:{value:e.user.firstname},on:{input:function(s){s.target.composing||e.$set(e.user,"firstname",s.target.value)}}}),e.errors["firstname"]?t("span",{class:["errorText"]},[e._v(e._s(e.errors["firstname"][0]))]):e._e()])]),t("div",{staticClass:"col-md-6 pl-1"},[t("div",{staticClass:"form-group"},[t("label",[e._v("Last Name")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.lastname,expression:"user.lastname"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Last Name"},domProps:{value:e.user.lastname},on:{input:function(s){s.target.composing||e.$set(e.user,"lastname",s.target.value)}}}),e.errors["lastname"]?t("span",{class:["errorText"]},[e._v(e._s(e.errors["lastname"][0]))]):e._e()])])]),t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-12"},[t("div",{staticClass:"form-group"},[t("label",[e._v("Address")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.details.address,expression:"user.details.address"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Home Address"},domProps:{value:e.user.details.address},on:{input:function(s){s.target.composing||e.$set(e.user.details,"address",s.target.value)}}}),e.errors["details.address"]?t("span",{class:["errorText"]},[e._v(e._s(e.errors["details.address"][0]))]):e._e()])])]),t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-6 pr-1"},[t("div",{staticClass:"form-group"},[t("label",[e._v("City")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.details.city,expression:"user.details.city"}],staticClass:"form-control",attrs:{type:"text",placeholder:"City"},domProps:{value:e.user.details.city},on:{input:function(s){s.target.composing||e.$set(e.user.details,"city",s.target.value)}}}),e.errors["details.city"]?t("span",{class:["errorText"]},[e._v(e._s(e.errors["details.city"][0]))]):e._e()])]),t("div",{staticClass:"col-md-6 pl-1"},[t("div",{staticClass:"form-group"},[t("label",[e._v("Postal Code")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.details.postal,expression:"user.details.postal"}],staticClass:"form-control",attrs:{type:"number",placeholder:"ZIP Code"},domProps:{value:e.user.details.postal},on:{input:function(s){s.target.composing||e.$set(e.user.details,"postal",s.target.value)}}}),e.errors["details.postal"]?t("span",{class:["errorText"]},[e._v(e._s(e.errors["details.postal"][0]))]):e._e()])])]),t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-6 pr-1"},[t("div",{staticClass:"form-group"},[t("label",[e._v("Esewa ID")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.details.esewa_id,expression:"user.details.esewa_id"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Esewa ID"},domProps:{value:e.user.details.esewa_id},on:{input:function(s){s.target.composing||e.$set(e.user.details,"esewa_id",s.target.value)}}}),e.errors["details.esewa_id"]?t("span",{class:["errorText"]},[e._v(e._s(e.errors["details.esewa_id"][0]))]):e._e()])]),t("div",{staticClass:"col-md-6 pl-1"},[t("div",{staticClass:"form-group"},[t("label",[e._v("Khalti ID")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.details.khalti_id,expression:"user.details.khalti_id"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Khalti ID"},domProps:{value:e.user.details.khalti_id},on:{input:function(s){s.target.composing||e.$set(e.user.details,"khalti_id",s.target.value)}}}),e.errors["details.khalti_id"]?t("span",{class:["errorText"]},[e._v(e._s(e.errors["details.khalti_id"][0]))]):e._e()])])]),t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-12"},[t("div",{staticClass:"form-group"},[t("label",[e._v("About Me")]),t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.user.details.about,expression:"user.details.about"}],staticClass:"form-control textarea",domProps:{value:e.user.details.about},on:{input:function(s){s.target.composing||e.$set(e.user.details,"about",s.target.value)}}}),e.errors["details.about"]?t("span",{class:["errorText"]},[e._v(e._s(e.errors["details.about"][0]))]):e._e()])])]),t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-12"},[t("div",{staticClass:"form-group"},[t("input",{attrs:{type:"file",id:"file"},on:{change:e.onFileChange}}),e.errors.file?t("span",{class:["errorText"]},[e._v(e._s(e.errors.file[0]))]):e._e()])])]),t("div",{staticClass:"row"},[t("div",{staticClass:"update ml-auto mr-auto"},[t("button",{staticClass:"btn btn-primary btn-round",on:{click:e.updateUser}},[e._v(" Update Profile ")])])])])])])])])])},r=[],i=t("5530"),l=t("2f62"),o={name:"CustomerProfile",components:Object(i["a"])({},Object(l["b"])({user_token:"auth/getToken"})),data:function(){return{user:{firstname:"",image:"",lastname:"",phone:"",details:{phone:"",address:"",city:"",esewa_id:"",khalti_id:"",about:""}},uploadedFile:null,errors:[]}},created:function(){this.getUser()},computed:{},methods:{getUser:function(){var e=this;this.$http.get("https://eshop.test/api/frontend/getUser").then((function(s){var t=s.data.data[0];e.user.firstname=t.firstname,e.user.lastname=t.lastname,e.user.balance=t.balance,e.user.image=t.image,e.user.email=t.email,null!=t.details&&(e.user.details=t.details)})).catch((function(e){console.log(e.response)}))},onFileChange:function(e){this.uploadedFile=e.target.files[0]},updateUser:function(){var e=this;this.errors=Array();var s=new FormData;s.append("firstname",this.user.firstname),s.append("lastname",this.user.lastname),s.append("details_phone",this.user.details.phone),s.append("details_address",this.user.details.address),s.append("details_esewa_id",this.user.details.esewa_id),s.append("details_khalti_id",this.user.details.khalti_id),s.append("details_about",this.user.details.about),s.append("details_postal",this.user.details.postal),s.append("details_city",this.user.details.city),s.append("details_created_at",this.user.details.created_at),s.append("details_updated_at",this.user.details.updated_at),null!=this.uploadedFile&&s.append("file",this.uploadedFile),this.$http.post("https://eshop.test/api/frontend/updateUser",s).then((function(s){e.user=s.data.data[0],e.$toast.success("Successfully Update Data.",{timeout:2e3}),e.uploadedFile=null})).catch((function(s){if(422===s.response.status){var t=s.response.data.errors;e.errors=t,console.log(e.errors)}}))}}},d=o,n=(t("9c1d"),t("2877")),u=Object(n["a"])(d,a,r,!1,null,"6b1d2afa",null);s["default"]=u.exports},"9c1d":function(e,s,t){"use strict";var a=t("014a"),r=t.n(a);r.a}}]);
//# sourceMappingURL=chunk-fc384000.99e25732.js.map
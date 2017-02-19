"use strict";
var drawerModule = edgeJS.modules.get("drawer") || edgeJS.modules.add({ name: "drawer" });

drawerModule.views.add({ name: "preview-button" })
    .controllers.add({
        name: "click",
        init: function () {
            // this = controller
            this.attachEvent();
        },
        attachEvent: function () {
            var ctrl = this;
            ctrl.view.element.addEventListener("click", function (e) {
                e.preventDefault();
                ctrl.view.element.classList.toggle("active");
                document.querySelectorAll(".drag-title-bar")
                    .forEach(function (el) {
                        el.classList.toggle("hidden");
                    });
            });
        }
    });
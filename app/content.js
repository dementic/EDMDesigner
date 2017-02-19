"use strict";
var contentModule = edgeJS.modules.get("content") || edgeJS.modules.add({ name: "content" });

var contentView = contentModule.views.add({ name: "content" });

contentView.controllers.add({
    name: "columns",
    init: function (view) {
        var ctrl = this;
        document.addEventListener("DOMContentLoaded", function (event) {
            document.querySelectorAll("#content > .row > [class^='col-']")
                .forEach(function (column) {

                    /** SHOW CLICK TO EDIT **/
                    column.addEventListener("mouseenter", ctrl.events.mouseEnter);

                    column.addEventListener("mouseleave", ctrl.events.mouseLeave);

                    /** ON CLICK EVENT **/
                    //column.addEventListener("click", function (e) {
                    //    $(e.target.parentNode).summernote();
                    //});

                });
        });
    },
    events: {
        mouseEnter: function (e) {

            // Generate buttons container
            var clickToEdit = document.createElement("div");
            clickToEdit.className = "click-to-edit";
            e.target.appendChild(clickToEdit);

            var buttonClasses = "btn btn-xs btn-primary";

            var buttonEdit = document.createElement("button");
            buttonEdit.type = "button";
            buttonEdit.innerHTML = "<i class='fa fa-pencil'></i> Edit";
            buttonEdit.className = buttonClasses;
            // TODO: Attache Event


            var buttonReplace = document.createElement("button");
            buttonReplace.type = "button";
            buttonReplace.innerHTML = "<i class='fa fa-edit'></i> Replace";
            buttonReplace.className = buttonClasses;
            // TODO: Attache Event

            clickToEdit.appendChild(buttonEdit);
            clickToEdit.appendChild(buttonReplace);
        },
        mouseLeave: function (e) {
            var child = e.target.querySelector(".click-to-edit");
            if (!child) {
                return;
            }
            e.target.removeChild(child);
        },
        click: function (e) {
            var clickToEdit = e.target.closest(".click-to-edit"),
                column = clickToEdit.closest("[class^='col-']");
            // TODO: on click, change button to save/cancel
            // TODO: enable editor


        }
    }
});

contentView.controllers.add({
    name: "drag-title-bar",
    init: function (view) {
        /** delete rows **/
        document.querySelectorAll("#content > .row > .drag-title-bar  > a > i.fa.fa-trash")
            .forEach(function (button) {
                button.addEventListener("click",
                    function (e) {
                        e.preventdefault();

                        // todo: implement yes/no dialog
                        var row = e.target.parentNode.parentNode.parentNode;
                        row.outerhtml = "";
                    });
            });
    }
});

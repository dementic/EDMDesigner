"use strict";
var dragulaModule = edgeJS.modules.get("dragula") || edgeJS.modules.add({ name: "dragula" });
dragulaModule.views.add({ name: "dragula" })
    .controllers.add({
        name: "dragula",
        init: function () {
            var left = "sections";
            var right = "content";
            dragula([document.getElementById(left), document.getElementById(right)], {
                moves: function (el, container, handle) {
                    return handle.classList.contains("drag-handle");
                },
                copy: function (el, source) {
                    return source === document.getElementById(left);
                },
                accepts: function (el, target) {
                    return target !== document.getElementById(left);
                }
            }).on("drop", function (el) {
                var templateName = el.getAttribute("data-template");
                if (!templateName) { return; }
                fetch("app/templates/_" + templateName + ".html")
                    .then(function (response) {
                        return response.text();
                    })
                    .then(function (body) {
                        el.outerHTML = body;
                    });
            });
        }
    });
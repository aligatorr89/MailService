"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const shell = __importStar(require("shelljs"));
shell.cp("-R", "src/public/js/lib", "dist/public/js/");
shell.cp("-R", "src/public/fonts", "dist/public/");
shell.cp("-R", "src/public/images", "dist/public/");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvZ29zcG9kYXIvdW9fbWFpbF9zZXJ2aWNlL2NvcHlTdGF0aWNBc3NldHMudHMiLCJzb3VyY2VzIjpbIi9ob21lL2dvc3BvZGFyL3VvX21haWxfc2VydmljZS9jb3B5U3RhdGljQXNzZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUVqQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3ZELEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ25ELEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFLGNBQWMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc2hlbGwgZnJvbSBcInNoZWxsanNcIjtcblxuc2hlbGwuY3AoXCItUlwiLCBcInNyYy9wdWJsaWMvanMvbGliXCIsIFwiZGlzdC9wdWJsaWMvanMvXCIpO1xuc2hlbGwuY3AoXCItUlwiLCBcInNyYy9wdWJsaWMvZm9udHNcIiwgXCJkaXN0L3B1YmxpYy9cIik7XG5zaGVsbC5jcChcIi1SXCIsIFwic3JjL3B1YmxpYy9pbWFnZXNcIiwgXCJkaXN0L3B1YmxpYy9cIik7XG4iXX0=
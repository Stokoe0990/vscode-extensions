"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("../../Common");
class MakeFactory extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the name of the controller to create
            let name = yield this.getInput('Factory Name');
            if (name.length == 0) {
                this.showError('A factory name is required');
                return;
            }
            // Determine if this is a resource controller or not
            let hasModel = yield this.getYesNo('Is there a model related to this factory?');
            let modelName = '';
            if (hasModel) {
                modelName = yield this.getInput('Does the model have a name? Leave blank to use (Model::class)');
            }
            let command = `make:factory ${name} ${hasModel ? `--model${modelName.length > 0 ? `=${modelName}` : ''}` : ''}`;
            // Generate the factory
            this.execCmd(command, (info) => __awaiter(this, void 0, void 0, function* () {
                if (info.err) {
                    this.showError('Could not create the factory', info.err);
                }
                else {
                    yield this.openFile(info.artisan.dir, '/database/factories/' + name + '.php');
                }
            }));
        });
    }
}
exports.default = MakeFactory;
//# sourceMappingURL=Factory.js.map
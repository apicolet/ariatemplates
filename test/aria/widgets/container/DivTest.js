/*
 * Copyright 2012 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Test case for aria.widgets.container.DivTest
 */
Aria.classDefinition({
    $classpath : "test.aria.widgets.container.DivTest",
    $extends : "aria.jsunit.WidgetTestCase",
    $prototype : {
        testAsyncDiv : function () {
            // Need to load the widget class at test execution time because otherwise aria.widgets.AriaSkinInterface is
            // not defined. The first test hence becomes asynchronous
            Aria.load({
                classes : ["aria.widgets.container.Div"],
                oncomplete : {
                    fn : this._testDiv,
                    scope : this
                }
            });
        },

        _testDiv : function () {

            // create a new div object
            var div = new aria.widgets.container.Div({}, this.outObj.tplCtxt);
            this.assertFalse(div === null);

            this.outObj.clearAll();
            this.assertTrue(this.outObj.testArea.innerHTML === "" && this.outObj.store === "");

            div._widgetMarkupBegin(this.outObj);
            this.outObj.write("DIVCONTENT");
            div._widgetMarkupEnd(this.outObj);
            this.assertFalse(this.outObj.store === "");
            this.outObj.putInDOM();
            this.assertFalse(this.outObj.testArea.innerHTML === "");

            this.outObj.clearAll();
            div.$dispose();

            this.notifyTestEnd("testAsyncDiv");
        }
    }
});
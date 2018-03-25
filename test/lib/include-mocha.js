//-- Define includeMocha on the first loading of this file.
if ( includeMocha === undefined ){

  /** @function includeMocha()
    *
    * @description - Include mocha.js, chai.js (option), spec files and css styles in document. Setup and run mocha. Define global variables: mocha, chai (option), assert (option).
    *
    * @param {string|array|object} option
    * @param {string|array} option - use like option.spec
    *
    * @param {string|null} option.specRoot = "spec/" - Path to the folder that contains test specification files.
    * @param {string|array} option.specPath - Path or paths to the test specification file or files.
    *
    * @param {string|null} option.cssRoot = "css/" - Path to the folder that contains css files.
    * @param {string|array|null} option.cssPath = "mocha.css" - Path|patches to the css file.
    *
    * @param {bool} option.useChai = true - If true, then include chai.js.
    * @param {bool} option.defineAssert = true - If true, then define the variable "assert" as chai.assert.
    *
    * @param {string|null} option.libRoot = "lib/" - Path to the folder that contains lib files.
    * @param {string} option.mochaPath = "mocha.js" - Path from the libRoot to the mocha.js file.
    * @param {string} option.chaiPath = "chai.js" - Path from the libRoot to the chai.js file.
    * @param {string} option.selfPath = "include-mocha.js" - Path from the libRoot to the file of this script.
    *
    * @param {string|object} option.mochaSetup = "bdd" - Options to use in mocha.setup().
    *
    * @returns {undefined|Error}
    *
    * @member {object} option
    * @member {Runner} runner - Runner of mocha.js
    *
    * @method onScriptReloaded - Setup mocha.js, define window.assert, add the event listener "onDOMContentLoaded" and include spec files into the document.
    * @method onDOMContentLoaded - execute mocha.run() and define its result as "includeMocha.runner".
    * @method includeScript - Include a script file into the document.
    * @method includeStylesheet - Include a stylesheet file into the document.
    *
    */
    function includeMocha ( option ){
      var self = window.includeMocha;

      //-- Check input params
        //-- Check type of the param "option"
          if ( !isString( option )
            && !isArray( option )
            && !isSimpleObject( option )
            ){
            return new Error( 'Invalid input param. The param "option" should be string or array or [object Object]' );
          }
        //-- If the param "option" is array
          if ( isArray( option ) ){
            for (var i=0; i<option.length; i++){
              if ( !isString( option[i] ) ){
                return new Error( 'Invalid input param. Each element of the array "options" should be string.' );
              }
            }

          }
        //-- If the param "option" is object
          if ( isSimpleObject( option ) ){
            //-- Should return an object of the class "Error" if the param "option.specPath" is not string or array.
              if ( !isString( option.specPath )
                && !isArray( option.specPath )
                ){
                return new Error( 'Invalid input param. The option "option.specPath" should be string or array.' )
              }
            //-- Should return an object of the class "Error" if the param "option.specPath" is array and any its element is not string.
              if ( isArray( option.specPath ) ){
                for (var i=0; i<option.specPath.length; i++){
                  if ( !isString( option.specPath[i] ) ){
                    return new Error( 'Invalid input param. The option "option.specPath should contain only strings.' );
                  }
                }
              }
            //-- Should return an object of the class "Error" if the param "option.specRoot" is not string or null or undefined.
              if ( !isString( option.specRoot )
                && !isNull( option.specRoot )
                && !isUndefined( option.specRoot )
              ){
                return new Error( 'Invalid input param. The param "option.specRoot" should be string or null or undefined.' );
              }

            //-- Should return an object of the class "Error" if the param "option.cssPath" is not string or array or null or undefined.
              if ( !isString( option.cssPath )
                && !isArray( option.cssPath )
                && !isNull( option.cssPath )
                && !isUndefined( option.cssPath )
                ){
                  return new Error( 'Invalid input param. The param "option.cssPath" should be string or array or null or undefined.' );
              }
            //-- Should return an object of the class "Error" if the param "option.specPath" is array and any its alement is not string.
              if ( isArray( option.cssPath ) ){
                for (var i=0; i<option.cssPath.length; i++){
                  if ( !isString( option.cssPath[i] ) ){
                    return new Error( 'Invalid input param. The array "option.cssPath should contain only strings.' );
                  }
                }

              }
            //-- Should return an object of the class "Error" if the param "option.cssRoot" is not string or null or undefined.
              if ( !isString( option.cssRoot )
                && !isNull( option.cssRoot )
                && !isUndefined( option.cssRoot )
                ){
                return new Error( 'Invalid input param. The param "option.cssRoot" should be string or null or undefined.' );
              }
            //-- Should return an object of the class "Error" if the param "option.useChai" is not boolean or null or undefined.
              if ( !isBoolean( option.useChai )
                && !isNull( option.useChai )
                && !isUndefined( option.useChai )
                ){
                return new Error( 'Invalid input param. The param "option.useChai" should be boolean or null or undefined.' );
              }
            //-- Should return an object of the class "Error" if the param "option.defineAssert" is not boolean or null or undefined.
              if ( !isBoolean( option.defineAssert )
                && !isNull( option.defineAssert )
                && !isUndefined( option.defineAssert )
                ){
                return new Error( 'Invalid input param. The param "option.defineAssert" should be boolean or null or undefined.' );
              }
            //-- Should return an object of the class "Error" if the param "option.mochaPath" is not string or undefined.
              if ( !isString( option.mochaPath )
                && !isUndefined( option.mochaPath )
                ){
                return new Error( 'Invalid input param. The param "option.mochaPath" should be string or undefined.' );
              }
            //-- Should return an object of the class "Error" if the param "option.selfPath" is not string or undefined.
              if ( !isString( option.selfPath )
                && !isUndefined( option.selfPath )
              ){
                return new Error( 'Invalid input param. The param "option.selfPath" should be string or undefined.' );
              }

            //-- Should return an object of the class "Error" if the param "option.useChai" is true and the param "option.chaiPath" is not string or undefined.
              if ( option.useChai
                && !isString( option.chaiPath )
                && !isUndefined( option.chaiPath )
                ){
                return new Error( 'Invalid input param. The param "option.chaiPath" should be string  or undefined.' );
              }
            //-- Should return an object of the class "Error" if the param "option.libRoot" is not string or undefined.
              if ( !isString( option.libRoot )
                && !isUndefined( option.libRoot )
                ){
                return new Error( 'Invalid input param. The param "option.libRoot" should be string or undefined.' );
              }
            //-- Should return an object of the class "Error" if the param "option.mochaSetup" is not string or undefined or an object of the class "Object".
              if ( !isString( option.mochaSetup )
                && !isUndefined( option.mochaSetup )
                && !isSimpleObject( option.mochaSetup )
                ){
                  return new Error( 'Invalid input param. The param "option.mochaSetup" should be string or undefined or an object of the class Object.' )
              }
          }

      //
      //-- Check global vars before init
        if ( !isUndefined( window.mocha ) ){
          return new Error( 'Tried redefine the global var "mocha".' );
        }
        if ( ( option.useChai || isUndefined( option.useChai ) )
          && !isUndefined( window.chai )
          ){
          return new Error( 'Tried redefine the global var "chai".' );
        }
        if ( ( option.useChai || isUndefined( option.useChai ) )
          && ( option.defineAssert || isUndefined( option.defineAssert ) )
          && !isUndefined( window.assert )
          ){
          return new Error( 'Tried redefine the global var "assert".' );
        }
      //
      //-- init the private var "_thisScriptFirstNode"
        var _thisScriptFirstNode = document.head.l
      //
      //-- Init the member 'self.option'

        self.option = {};
        //-- Convert type of the input param "option"
          if ( typeof( option ) == 'string'
            || option instanceof Array
            ){
            option = { specPath : option };
          }

        //-- Init "specPath"
          self.option.specPath = [];
          if ( typeof( option.specPath ) == 'string' ){
            self.option.specPath.push( option.specPath );
          } else if ( option.specPath instanceof Array ){
            for (var i=0; i<option.specPath.length; i++){
              self.option.specPath.push( option.specPath[i] );
            }
          }
        //-- Init "specRoot"
          if ( option.specRoot === undefined ){
            self.option.specRoot = 'spec/';
          } else {
            self.option.specRoot = option.specRoot;
          }
        //-- Init "cssPath"
          if ( option.cssPath === null ){
            self.option.cssPath = null;
          } else {
            self.option.cssPath = [];
            if ( option.cssPath === undefined ){
              self.option.cssPath.push( "mocha.css" );
            } else if ( typeof( option.cssPath ) == 'string' ){
              self.option.cssPath.push( option.cssPath );
            } else {
              for (var i=0; i<option.cssPath.length; i++){
                self.option.cssPath.push( option.cssPath[i] );
              }
            }
          }
        //-- Init "cssRoot"
          if ( option.cssRoot === undefined ){
            self.option.cssRoot = 'css/';
          } else {
            self.option.cssRoot = option.cssRoot;
          }
        //-- Init "useChai"
          if ( option.useChai === undefined ){
            self.option.useChai = true;
          } else {
            self.option.useChai = option.useChai;
          }
        //-- Init "defineAssert"
          if ( option.defineAssert === undefined ){
            self.option.defineAssert = true;
          } else {
            self.option.defineAssert = option.defineAssert;
          }
        //-- Init "mochaPath"
          if ( option.mochaPath === undefined ){
            self.option.mochaPath = 'mocha.js';
          } else {
            self.option.mochaPath = option.mochaPath;
          }
        //-- Init "chaiPath"
          if ( option.chaiPath === undefined ){
            self.option.chaiPath = 'chai.js';
          } else {
            self.option.chaiPath = option.chaiPath;
          }
        //-- Init "selfPath"
          if ( option.selfPath === undefined ){
            self.option.selfPath = 'include-mocha.js';
          } else {
            self.option.selfPath = option.selfPath;
          }
        //-- Init "libRoot"
          if ( option.libRoot === undefined ){
            self.option.libRoot = 'lib/';
          } else if ( option.libRoot === null ){
            self.option.libRoot = null;
          } else {
            self.option.libRoot = option.libRoot;
          }
        //-- Init "mochaSetup"
          if ( option.mochaSetup === undefined ){
            self.option.mochaSetup = "bdd";
          } else {
            self.option.mochaSetup = option.mochaSetup;
          }
        //
      //
      //-- include stylesheets
        if ( self.option.cssPath ){
          self.option.cssPath.forEach(function( cssPath, i, cssPathArray){
            var cssRoot = ( self.option.cssRoot ) ? self.option.cssRoot : "";
            var link = self.includeStylesheet( cssRoot+cssPath );
            link.includeMocha = true;
          });
        }
      //
      //-- include mocha.js
        var mochaScript = null;
        if ( !self.option.libRoot ){
          mochaScript = self.includeScript( self.option.mochaPath ).includeMocha = true;
        } else {
          mochaScript = self.includeScript( self.option.libRoot + self.option.mochaPath ).includeMocha = true;
        }
        mochaScript.includeMocha = true;
      //
      //-- include chai.js
        if ( self.option.useChai ){
          var chaiScript = null;
          if ( !self.option.libRoot ){
            chaiScript = self.includeScript( self.option.chaiPath ).includeMocha = true;
          } else {
            chaiScript = self.includeScript( self.option.libRoot + self.option.chaiPath ).includeMocha = true;
          }
          chaiScript.includeMocha = true;
        }
      //
      //-- reload this file
        var selfScript = null;
        if ( !self.option.libRoot ){
          selfScript = self.includeScript( self.option.selfPath ).includeMocha = true;
        } else {
          selfScript = self.includeScript( self.option.libRoot + self.option.selfPath ).includeMocha = true;
        }
        selfScript.includeMocha = true;
      //
      //-- Support functions
        function isString( param ){
          if ( typeof param == 'string' ) return true;
          return false;
        }
        function isArray( param ){
          if ( param instanceof Array ) return true;
          return false;
        }
        function isSimpleObject( param ){
          if ( typeof param == 'object'
            && param !== null
            && param.toString() == '[object Object]'
          ) return true;

          return false;
        }
        function isNull( param ){
          if ( typeof param == 'object' && param === null )
            return true;
          return false;
        }
        function isUndefined( param ){
          if ( param === undefined ) return true;
          return false;
        }
        function isBoolean( param ){
          if ( typeof param == 'boolean' ) return true;
          return false;
        }
      //
    }
    includeMocha.__proto__ = IncludeMocha.prototype;
    includeMocha.option = null;
    includeMocha.runner = null;
  //
  /** @method includeScript() - Include in document a script file.
   * @memberOf includeMocha()
   *
   * @description Insert a DOM-node "script" into the DOM-node "head".
   *
   * @param {string} src
   * @param {boolean} [async = false]
   *
   * @returns {HTMLScriptElement|Error}
   *
   */
    includeMocha.includeScript = function( src, async ){
      if ( typeof(src) != 'string' ){
        return new Error('Invalid input param. The param "src" should be string.');
      };
      if ( async !== undefined && typeof(async) != 'boolean' ){
        return new Error('Invalid input param. The param "async" should be boolean or undefined.');
      }

      async = async || false;

      var script = document.createElement( 'script' );
      script.src = src;
      script.async = async;

      document.head.appendChild( script );

      return script;

    }
  /** @method includeStylesheet() - Include in document a css file.
   * @memberOf includeMocha()
   *
   * @description Insert a DOM-node "link" into the DOM-node "head".
   *
   * @param {string} href
   *
   * @returns {HTMLLinkElement|Error}
   *
   */
    includeMocha.includeStylesheet = function( href ){
      if ( typeof(href) != 'string' ){
        return new Error('Invalid input param. The param "href" should be string.');
      }

      var link = document.createElement( 'link' );
      link.rel = "stylesheet";
      link.href = href;

      document.head.appendChild( link );

      return link;
    }
  /** @method onDOMContentLoaded() - execute mocha.run()
   * @memberOf includeMocha()
   *
   * @description execute mocha.run() and define "includeMocha.runner" as its result.
   *
   * @returns {undefined}
   */
    includeMocha.onDOMContentLoaded = function(){
      includeMocha.runner = window.mocha.run();
    }
  /** @method onScriptReloaded() - Setup mocha.js, define window.assert, add the event listener "onDOMContentLoaded" and include spec files into the document.
   * @memberOf includeMocha()
   *
   * @description This function will be execute when this script is reloaded. Setup mocha.js, define window.assert, add the event listener "onDOMContentLoaded" and include spec files into the document.
   *
   * @returns {undefined}
   */
    includeMocha.onScriptReloaded = function(){
      var self = window.includeMocha;
      var option = self.option;

      // Setup mocha
        window.mocha.setup( option.mochaSetup );
      // define window.assert
        if ( option.useChai && option.defineAssert ){
          window.assert = window.chai.assert;
        }
      // add the event listener "onDOMContentLoaded"
        document.addEventListener('DOMContentLoaded', includeMocha.onDOMContentLoaded);
      // include spec files
        option.specPath.forEach(function( specPath, i, specPathArray){
          var specRoot = ( option.specRoot ) ? self.option.specRoot : "";
          var script = self.includeScript( specRoot+specPath );
          script.includeMocha = true;
        });
        
      self.reloaded = true;
      //-- reload this file
        var selfScript = null;
        if ( !self.option.libRoot ){
          selfScript = self.includeScript( self.option.selfPath ).includeMocha = true;
        } else {
          selfScript = self.includeScript( self.option.libRoot + self.option.selfPath ).includeMocha = true;
        }
        selfScript.includeMocha = true;
      //
    }
  //
  function IncludeMocha(){
  }
  IncludeMocha.prototype.__proto__ = Function.prototype;
  //
} else if ( !window.includeMocha.reloaded ){
    window.includeMocha.onScriptReloaded();
} else {
  window.includeMocha.onDOMContentLoaded();
}
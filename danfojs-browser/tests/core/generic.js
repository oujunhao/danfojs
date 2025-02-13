/* eslint-disable no-undef */
const tf = require('@tensorflow/tfjs');


describe("Generic (NDFrame)", function () {
  describe("NDframe Created from Array", function () {
    it("prints the shape of a 1D array", function () {
      let data = [ 1, 2, 3, "Boy", "Girl" ];
      let ndframe = new dfd.NDframe({ data, isSeries:true });
      assert.deepEqual(ndframe.shape, [ 5, 1 ]);
    });
    it("prints the default assigned column name in a series", function () {
      let data = [ "Boy", 20, 25 ];
      let ndframe = new dfd.NDframe({ data, isSeries:true });
      assert.deepEqual(ndframe.columns, [ "0" ]);
    });
    it("prints the assigned column name in a series", function () {
      let data = [ "Boy", 20, 25 ];
      let options = { "columns": 'Records', isSeries : true };
      let ndframe = new dfd.NDframe({ data, ...options });
      assert.deepEqual(ndframe.columns, "Records");
    });
    it("prints the shape of a 2D array", function () {
      let data = [ [ "Boy", 20 ], [ "Girl", 25 ] ];
      let ndframe = new dfd.NDframe({ data, isSeries:false });
      assert.deepEqual(ndframe.shape, [ 2, 2 ]);
    });
    it("prints the default assigned column names in 2D frame", function () {
      let data = [ [ "Boy", 20 ], [ "Girl", 25 ] ];
      let ndframe = new dfd.NDframe({ data, isSeries:false });
      assert.deepEqual(ndframe.columns, [ "0", "1" ]);
    });
    it("prints the assigned column names", function () {
      let data = [ [ "Boy", 20 ], [ "Girl", 25 ] ];
      let options = { "columns": [ "Gender", "Age" ], isSeries : false };
      let ndframe = new dfd.NDframe({ data, ...options });
      assert.deepEqual(ndframe.columns, [ "Gender", "Age" ]);
    });
    it("prints the size of a frame", function () {
      let data = [ [ "Boy", 20, 1 ], [ "Girl", 25, 3 ] ];
      let options = { "columns": [ "Gender", "Age", "count" ], isSeries : false };
      let ndframe = new dfd.NDframe({ data, ...options });
      assert.deepEqual(ndframe.size, 6);
    });
    it("prints the dimension of a frame", function () {
      let data = [ [ "Boy", 20, 1 ], [ "Girl", 25, 3 ] ];
      let options = { "columns": [ "Gender", "Age", "count" ], isSeries:false };
      let ndframe = new dfd.NDframe({ data, ...options });
      assert.deepEqual(ndframe.ndim, 2);
    });
    it("prints the values of a frame", function () {
      let data = [ [ 21, 20, 1 ], [ 20, 25, 3 ] ];
      let ndframe = new dfd.NDframe({ data, isSeries:false });
      assert.deepEqual(ndframe.values, data);
    });
    it("prints the values of a frame", function () {
      let data = [ [ 21, 20, 1 ], [ 20, 25, 3 ] ];
      let ndframe = new dfd.NDframe({ data, isSeries:false });
      assert.deepEqual(ndframe.values, data);
    });
  });

  describe("NDframe Created from JavaScript Object", function () {

    it("prints the shape of a 2D frame created from an Object", function () {
      let data = [ { alpha: "A", count: 1 }, { alpha: "B", count: 2 }, { alpha: "C", count: 3 } ];
      let ndframe = new dfd.NDframe({ data, isSeries:false });
      assert.deepEqual(ndframe.shape, [ 3, 2 ]);
    });
    it("prints the column names of frame created from an Object", function () {
      let data = [ { alpha: "A", count: 1 }, { alpha: "B", count: 2 }, { alpha: "C", count: 3 } ];
      let ndframe = new dfd.NDframe({ data, isSeries:false });
      assert.deepEqual(ndframe.columns, [ "alpha", "count" ]);
    });
    it("prints the shape of a 1D frame created from an Object", function () {
      let data = [ { alpha: "A", count: 1 } ];
      let ndframe = new dfd.NDframe({ data, isSeries:false });
      assert.deepEqual(ndframe.shape, [ 1, 2 ]);
    });

    it("prints the size of a frame created from an Object", function () {
      let data = [ { alpha: "A", count: 1 }, { alpha: "B", count: 2 }, { alpha: "C", count: 3 } ];
      let options = { isSeries : false };
      let ndframe = new dfd.NDframe({ data, ...options });
      assert.deepEqual(ndframe.size, 6);
    });
    it("prints the dimension of a frame created from an Object", function () {
      let data = [ { alpha: "A", count: 1 }, { alpha: "B", count: 2 } ];
      let options = { isSeries : false };
      let ndframe = new dfd.NDframe({ data, ...options });
      assert.deepEqual(ndframe.ndim, 2);
    });
    it("prints the values of a frame created from an Object", function () {
      let data = [ { alpha: "A", count: 1 }, { alpha: "B", count: 2 } ];
      let ndframe = new dfd.NDframe({ data, isSeries:false });
      assert.deepEqual(ndframe.values, [ [ "A", 1 ], [ "B", 2 ] ]);
    });
    it("prints the values of a frame created from an Object with null values", function () {
      let data = [ { alpha: "A", count: null }, { alpha: null, count: 2 } ];
      let ndframe = new dfd.NDframe({ data, isSeries:false });
      assert.deepEqual(ndframe.values, [ [ "A", null ], [ null, 2 ] ]);
    });
  });

  describe("NDframe Created from a Tensor", function () {

    it("prints the shape of a 2D frame created from a 2D tensor", function () {
      let data = tf.tensor([ 1, 2, 3, 4 ]);
      let ndframe = new dfd.NDframe({ data, isSeries:true });
      assert.deepEqual(ndframe.ndim, 1);
      assert.deepEqual(ndframe.values, [ 1, 2, 3, 4 ]);

    });
    it("prints the shape of a 2D frame created from a 1D tensor", function () {
      let data = tf.tensor([ [ 2, 3, 4 ], [ 4, 5, 6 ] ]);
      let ndframe = new dfd.NDframe({ data, columns: [ "alpha", "count", "sum" ], isSeries : false });
      assert.deepEqual(ndframe.columns, [ "alpha", "count", "sum" ]);
    });

  });

  describe("index", function () {
    it("Returns the index of an NDframe", function () {
      let data = [ { alpha: "A", count: 1 }, { alpha: "B", count: 2 }, { alpha: "C", count: 3 } ];
      let df = new dfd.NDframe({ data, isSeries:false });
      assert.deepEqual(df.index, [ 0, 1, 2 ]);
    });
    it("Returns the index of an NDframe created from an Array", function () {
      let data = [ [ 12, 2, 20 ], [ 90, 5, 23 ], [ 45, 56, 70 ], [ 9, 10, 19 ] ];
      let df = new dfd.NDframe({ data, isSeries:false });
      assert.deepEqual(df.index, [ 0, 1, 2, 3 ]);
    });
  });

  describe("NDframe Created from JavaScript Object of Arrays", function () {
    it("retrieves the row data created from OA ", function () {
      let data = { alpha: [ "A", "B" ], count: [ 1, 2 ] };
      let ndframe = new dfd.NDframe({ data, isSeries:false });
      // assert.deepEqual(ndframe.shape, [4, 2])
      assert.deepEqual(ndframe.values, [ [ "A", 1 ], [ "B", 2 ] ]);
    });
  });

  describe("$setIndex", function () {
    it("sets the index of an NDframe", function () {
      let data = [ { alpha: "A", count: 1 }, { alpha: "B", count: 2 }, { alpha: "C", count: 3 } ];
      let df = new dfd.NDframe({ data, isSeries:false });
      df.$setIndex([ "A", "B", "C" ]);
      assert.deepEqual(df.index, [ "A", "B", "C" ]);
    });
    it("Returns the index of an NDframe created from an Array", function () {
      let data = [ [ 12, 2, 20 ], [ 90, 5, 23 ], [ 45, 56, 70 ], [ 9, 10, 19 ] ];
      let df = new dfd.NDframe({ data, isSeries:false });
      df.$setIndex([ 10, 20, 30, 40 ]);
      assert.deepEqual(df.index, [ 10, 20, 30, 40 ]);
    });
  });


  describe("dtype", function () {
    it("Returns int dtype set during creation of 1DFrame (Series) from an Object", function () {
      let data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
      let options = { dtypes: [ 'int32' ], isSeries : true };
      let ndframe = new dfd.NDframe({ data, ...options });
      assert.deepEqual(ndframe.dtypes, [ 'int32' ]);
    });

    it("Returns string dtype set during creation of 1DFrame (Series) from an Array", function () {
      let data = [ "Alice", "Yemi", "Rising", "Mark" ];
      let options = { dtypes: [ 'string' ], isSeries : true };
      let ndframe = new dfd.NDframe({ data, ...options });
      assert.deepEqual(ndframe.dtypes, [ "string" ]);
    });

    it("Returns string dtype automatically inferred from 1DFrame (Series)", function () {
      let data = [ "Alice", "Yemi", "Rising", "Mark" ];
      let options = { columns: 'Names', isSeries : true };
      let ndframe = new dfd.NDframe({ data, ...options });
      assert.deepEqual(ndframe.dtypes, [ "string" ]);
    });

    it("Returns int dtype automatically inferred from 1DFrame (Series)", function () {
      let data = [ 20, 30, 20, 20 ];
      let options = { columns: 'Size', isSeries : true };
      let ndframe = new dfd.NDframe({ data, ...options });
      assert.deepEqual(ndframe.dtypes, [ "int32" ]);
    });
    it("Returns float dtype automatically inferred from 1DFrame (Series)", function () {
      let data = [ 20.1, 30.4, 20.2, 4.23, 20.1 ];
      let options = { columns: 'Size', isSeries : true };
      let ndframe = new dfd.NDframe({ data, ...options });
      assert.deepEqual(ndframe.dtypes, [ "float32" ]);
    });


    it("Returns dtype set during creation of 2DFrame from an Object", function () {
      let data = [ { alpha: "A", count: 1 }, { alpha: "B", count: 2 } ];
      let options = { dtypes: [ 'string', 'int32' ], isSeries : false };
      let ndframe = new dfd.NDframe({ data, ...options });
      assert.deepEqual(ndframe.dtypes, [ 'string', 'int32' ]);
    });
    it("Returns dtype set during creation of 2DFrame from an Array", function () {
      let data = [ [ "Alice", 2, 3.0 ], [ "Boy", 5, 6.1 ], [ "Girl", 30, 40 ], [ 39, 89, 78.2 ] ];
      let cols = [ "Name", "Count", "Score" ];
      let options = { columns: cols, dtypes: [ 'string', 'int32', 'float32' ], isSeries : false };
      let ndframe = new dfd.NDframe({ data, ...options });
      assert.deepEqual(ndframe.dtypes, [ "string", "int32", "float32" ]);
    });

    it("Returns dtype automatically inferred from 2DFrame", function () {
      let data = [ [ "Alice", 2, 3.1 ], [ "Boy", 5, 6.1 ], [ "Girl", 30, 40.2 ], [ 39, 89, 78.2 ] ];
      let cols = [ "Name", "Count", "Score" ];
      let options = { columns: cols, isSeries : false };
      let ndframe = new dfd.NDframe({ data, ...options });
      assert.deepEqual(ndframe.dtypes, [ "string", "int32", "float32" ]);
    });

  });


  // describe("to_csv", async function () {
  //   it("Converts DataFrame to csv format and return string", async function () {
  //     let data = [ { alpha: "A", count: 1 }, { alpha: "B", count: 2 }, { alpha: "C", count: 3 } ];
  //     let df = new dfd.NDframe({ data, isSeries:true });
  //     let result = `alpha,count\nA,1\nB,2\nC,3\n`;
  //     df.to_csv().then((csv) => {
  //       assert.deepEqual(csv, result);
  //     });
  //   });
  //   it("Converts DataFrame of Series to csv format and return string when path is not specified", async function () {
  //     let data = [ [ 12, 2, 20 ], [ 90, 5, 23 ], [ 45, 56, 70 ], [ 9, 10, 19 ] ];
  //     let df = new dfd.NDframe(data, { columns: [ "A", "B", "C" ] });
  //     let result = `A,B,C\n12,2,20\n90,5,23\n45,56,70\n9,10,19\n`;
  //     assert.deepEqual(await df.to_csv(), result);
  //   });
  // });

  // describe("to_json", async function () {
  //   it("Converts DataFrame to json format and return string", async function () {
  //     let data = [ { alpha: "A", count: 1 }, { alpha: "B", count: 2 }, { alpha: "C", count: 3 } ];
  //     let result = JSON.stringify([ { alpha: "A", count: 1 }, { alpha: "B", count: 2 }, { alpha: "C", count: 3 } ]);

  //     let df = new dfd.NDframe({ data, isSeries:true });
  //     df.to_json().then((json) => {
  //       assert.deepEqual(json, result);
  //     });
  //   });
  //   it("Converts DataFrame to json format", async function () {
  //     let data = [ [ 12, 2, 20 ], [ 90, 5, 23 ], [ 45, 56, 70 ] ];
  //     let df = new dfd.NDframe(data, { columns: [ "A", "B", "C" ] });
  //     let result = JSON.stringify([ { A: 12, B: 2, C: 20 }, { A: 90, B: 5, C: 23 }, { A: 45, B: 56, C: 70 } ]);
  //     df.to_json().then((json) => {
  //       assert.deepEqual(json, result);
  //     });
  //   });
  // });


});

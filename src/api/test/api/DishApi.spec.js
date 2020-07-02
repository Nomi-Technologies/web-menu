/*
 * A collection of Nomi's APIs
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.13
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.ACollectionOfNomisApIs);
  }
}(this, function(expect, ACollectionOfNomisApIs) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new ACollectionOfNomisApIs.DishApi();
  });

  describe('(package)', function() {
    describe('DishApi', function() {
      describe('apiDishesDishIdDelete', function() {
        it('should call apiDishesDishIdDelete successfully', function(done) {
          // TODO: uncomment, update parameter values for apiDishesDishIdDelete call
          /*
          var dishId = 56;

          instance.apiDishesDishIdDelete(dishId, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('apiDishesDishIdGet', function() {
        it('should call apiDishesDishIdGet successfully', function(done) {
          // TODO: uncomment, update parameter values for apiDishesDishIdGet call
          /*
          var dishId = 56;

          instance.apiDishesDishIdGet(dishId, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('apiDishesDishIdPut', function() {
        it('should call apiDishesDishIdPut successfully', function(done) {
          // TODO: uncomment, update parameter values for apiDishesDishIdPut call
          /*
          var dishId = 56;

          instance.apiDishesDishIdPut(dishId, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('apiDishesGet', function() {
        it('should call apiDishesGet successfully', function(done) {
          // TODO: uncomment apiDishesGet call and complete the assertions
          /*

          instance.apiDishesGet(function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            let dataCtr = data;
            expect(dataCtr).to.be.an(Array);
            expect(dataCtr).to.not.be.empty();
            for (let p in dataCtr) {
              let data = dataCtr[p];
              expect(data).to.be.a(ACollectionOfNomisApIs.Dish);
              expect(data.id).to.be.a('number');
              expect(data.id).to.be(0);
              expect(data.name).to.be.a('string');
              expect(data.name).to.be("");
              expect(data.description).to.be.a('string');
              expect(data.description).to.be("");
              expect(data.notes).to.be.a('string');
              expect(data.notes).to.be("");
              expect(data.tableTalkPoints).to.be.a('string');
              expect(data.tableTalkPoints).to.be("");
              expect(data.categoryId).to.be.a('number');
              expect(data.categoryId).to.be(0);
              expect(data.category).to.be.a(ACollectionOfNomisApIs.Category);
                    expect(data.category.id).to.be.a('number');
                expect(data.category.id).to.be(0);
                expect(data.category.name).to.be.a('string');
                expect(data.category.name).to.be("");
                expect(data.category.restaurantId).to.be.a('number');
                expect(data.category.restaurantId).to.be(0);
              expect(data.restaurantId).to.be.a('number');
              expect(data.restaurantId).to.be(0);
              {
                let dataCtr = data.tags;
                expect(dataCtr).to.be.an(Array);
                expect(dataCtr).to.not.be.empty();
                for (let p in dataCtr) {
                  let data = dataCtr[p];
                  expect(data).to.be.a(ACollectionOfNomisApIs.Tag);
                  expect(data.id).to.be.a('number');
                  expect(data.id).to.be("0");
                  expect(data.name).to.be.a('string');
                  expect(data.name).to.be("");
                  expect(data.type).to.be.a('string');
                  expect(data.type).to.be("");
                  expect(data.excludeForFilter).to.be.a('boolean');
                  expect(data.excludeForFilter).to.be(false);
                  expect(data.dishTags).to.be.a(ACollectionOfNomisApIs.TagDishTags);
                        expect(data.dishTags.dishId).to.be.a('number');
                    expect(data.dishTags.dishId).to.be(0);
                    expect(data.dishTags.tagId).to.be.a('number');
                    expect(data.dishTags.tagId).to.be(0);
                    expect(data.dishTags.removable).to.be.a('boolean');
                    expect(data.dishTags.removable).to.be(false);
  
                        }
              }
            }

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('apiDishesPost', function() {
        it('should call apiDishesPost successfully', function(done) {
          // TODO: uncomment, update parameter values for apiDishesPost call and complete the assertions
          /*
          var opts = {};
          opts.dish = new ACollectionOfNomisApIs.Dish();
          opts.dish.id = 0;
          opts.dish.name = "";
          opts.dish.description = "";
          opts.dish.notes = "";
          opts.dish.tableTalkPoints = "";
          opts.dish.categoryId = 0;
          opts.dish.category = new ACollectionOfNomisApIs.Category();
          opts.dish.category.id = 0;
          opts.dish.category.name = "";
          opts.dish.category.restaurantId = 0;
          opts.dish.restaurantId = 0;
          opts.dish.tags = [new ACollectionOfNomisApIs.Tag()];
          opts.dish.tags[0].id = "0";
          opts.dish.tags[0].name = "";
          opts.dish.tags[0].type = "";
          opts.dish.tags[0].excludeForFilter = false;
          opts.dish.tags[0].dishTags = new ACollectionOfNomisApIs.TagDishTags();
          opts.dish.tags[0].dishTags.dishId = 0;
          opts.dish.tags[0].dishTags.tagId = 0;
          opts.dish.tags[0].dishTags.removable = false;

          instance.apiDishesPost(opts, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(ACollectionOfNomisApIs.Dish);
            expect(data.id).to.be.a('number');
            expect(data.id).to.be(0);
            expect(data.name).to.be.a('string');
            expect(data.name).to.be("");
            expect(data.description).to.be.a('string');
            expect(data.description).to.be("");
            expect(data.notes).to.be.a('string');
            expect(data.notes).to.be("");
            expect(data.tableTalkPoints).to.be.a('string');
            expect(data.tableTalkPoints).to.be("");
            expect(data.categoryId).to.be.a('number');
            expect(data.categoryId).to.be(0);
            expect(data.category).to.be.a(ACollectionOfNomisApIs.Category);
                  expect(data.category.id).to.be.a('number');
              expect(data.category.id).to.be(0);
              expect(data.category.name).to.be.a('string');
              expect(data.category.name).to.be("");
              expect(data.category.restaurantId).to.be.a('number');
              expect(data.category.restaurantId).to.be(0);
            expect(data.restaurantId).to.be.a('number');
            expect(data.restaurantId).to.be(0);
            {
              let dataCtr = data.tags;
              expect(dataCtr).to.be.an(Array);
              expect(dataCtr).to.not.be.empty();
              for (let p in dataCtr) {
                let data = dataCtr[p];
                expect(data).to.be.a(ACollectionOfNomisApIs.Tag);
                expect(data.id).to.be.a('number');
                expect(data.id).to.be("0");
                expect(data.name).to.be.a('string');
                expect(data.name).to.be("");
                expect(data.type).to.be.a('string');
                expect(data.type).to.be("");
                expect(data.excludeForFilter).to.be.a('boolean');
                expect(data.excludeForFilter).to.be(false);
                expect(data.dishTags).to.be.a(ACollectionOfNomisApIs.TagDishTags);
                      expect(data.dishTags.dishId).to.be.a('number');
                  expect(data.dishTags.dishId).to.be(0);
                  expect(data.dishTags.tagId).to.be.a('number');
                  expect(data.dishTags.tagId).to.be(0);
                  expect(data.dishTags.removable).to.be.a('boolean');
                  expect(data.dishTags.removable).to.be(false);

                      }
            }

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('webApiDishesRestaurantIdGet', function() {
        it('should call webApiDishesRestaurantIdGet successfully', function(done) {
          // TODO: uncomment, update parameter values for webApiDishesRestaurantIdGet call and complete the assertions
          /*
          var restaurantId = "restaurantId_example";

          instance.webApiDishesRestaurantIdGet(restaurantId, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            let dataCtr = data;
            expect(dataCtr).to.be.an(Array);
            expect(dataCtr).to.not.be.empty();
            for (let p in dataCtr) {
              let data = dataCtr[p];
              expect(data).to.be.a(ACollectionOfNomisApIs.Dish);
              expect(data.id).to.be.a('number');
              expect(data.id).to.be(0);
              expect(data.name).to.be.a('string');
              expect(data.name).to.be("");
              expect(data.description).to.be.a('string');
              expect(data.description).to.be("");
              expect(data.notes).to.be.a('string');
              expect(data.notes).to.be("");
              expect(data.tableTalkPoints).to.be.a('string');
              expect(data.tableTalkPoints).to.be("");
              expect(data.categoryId).to.be.a('number');
              expect(data.categoryId).to.be(0);
              expect(data.category).to.be.a(ACollectionOfNomisApIs.Category);
                    expect(data.category.id).to.be.a('number');
                expect(data.category.id).to.be(0);
                expect(data.category.name).to.be.a('string');
                expect(data.category.name).to.be("");
                expect(data.category.restaurantId).to.be.a('number');
                expect(data.category.restaurantId).to.be(0);
              expect(data.restaurantId).to.be.a('number');
              expect(data.restaurantId).to.be(0);
              {
                let dataCtr = data.tags;
                expect(dataCtr).to.be.an(Array);
                expect(dataCtr).to.not.be.empty();
                for (let p in dataCtr) {
                  let data = dataCtr[p];
                  expect(data).to.be.a(ACollectionOfNomisApIs.Tag);
                  expect(data.id).to.be.a('number');
                  expect(data.id).to.be("0");
                  expect(data.name).to.be.a('string');
                  expect(data.name).to.be("");
                  expect(data.type).to.be.a('string');
                  expect(data.type).to.be("");
                  expect(data.excludeForFilter).to.be.a('boolean');
                  expect(data.excludeForFilter).to.be(false);
                  expect(data.dishTags).to.be.a(ACollectionOfNomisApIs.TagDishTags);
                        expect(data.dishTags.dishId).to.be.a('number');
                    expect(data.dishTags.dishId).to.be(0);
                    expect(data.dishTags.tagId).to.be.a('number');
                    expect(data.dishTags.tagId).to.be(0);
                    expect(data.dishTags.removable).to.be.a('boolean');
                    expect(data.dishTags.removable).to.be(false);
  
                        }
              }
            }

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
    });
  });

}));

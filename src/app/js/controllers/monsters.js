'use strict';

angular.module('gruntGulpBroccoliWorkshop')
  .controller('MonsterCtrl', function ($scope, $routeParams, Page) {

    var title = 'Meet the Monsters',

        // FIXME This should be in a database for production
        monsters = {
          screedle: {
            name: 'Screedle',
            photo: '/images/screedle.png',
            description: 'Screedle is a leader. He is the glue that holds ' +
                         'this group together. You can usually find ' +
                         'Screedle planning birthday parties, writing thank ' +
                         'you cards, or smiling at passersby on the sidewalk.'
          },
          beedle: {
            name: 'Beedle',
            photo: '/images/beedle.png',
            description: 'Beedle is a party animal. Her spirit animal is ' +
                         'Michelangelo from the Ninja Turtles, and she has ' +
                         'spent the last year of her life trying to revive ' +
                         '"cowabunga" in the mainstream.'
          },
          deedle: {
            name: 'Deedle',
            photo: '/images/deedle.png',
            description: 'Deedle is a bit of a nerd. She would deny it, but ' +
                         'she tends to run things behind the scenes. If a ' +
                         'problem arises, Deedle is the one to dig in and ' +
                         'figure out a solution.'
          },
          jeffrey: {
            name: 'Jeffrey',
            photo: '/images/jeffrey.png',
            description: 'Jeffrey\'s always been a bit different. He spends ' +
                         'most of his time fighting crime as his alter-ego, ' +
                         'Super Jeffrey, who wears a hat. Jeffrey is not ' +
                         'good at making disguises.'
          }
        };

    // Determines whether to show a single monster or a list of all
    if (typeof $routeParams.name!=='undefined') {
      var name = $routeParams.name;
      
      // Changes the title
      title = 'Meet ' + name.charAt(0).toUpperCase() + name.slice(1);
      
      $scope.monster = monsters[name];
    } else {
      $scope.monsters = monsters;
    }

    $scope.Page = Page;
    Page.setTitle(title);
    
  });

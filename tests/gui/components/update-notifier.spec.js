'use strict';

const m = require('mochainon');
const _ = require('lodash');
const angular = require('angular');
const units = require('../../../lib/shared/units');
const release = require('../../../lib/shared/release');
const packageJSON = require('../../../package.json');
require('angular-mocks');

describe('Browser: UpdateNotifier', function() {

  beforeEach(angular.mock.module(
    require('../../../lib/gui/components/update-notifier')
  ));

  describe('UpdateNotifierService', function() {

    describe('.UPDATE_NOTIFIER_SLEEP_DAYS', function() {

      let UpdateNotifierService;

      beforeEach(angular.mock.inject(function(_UpdateNotifierService_) {
        UpdateNotifierService = _UpdateNotifierService_;
      }));

      it('should be an integer', function() {
        m.chai.expect(_.isInteger(UpdateNotifierService.UPDATE_NOTIFIER_SLEEP_DAYS)).to.be.true;
      });

      it('should be greater than 0', function() {
        m.chai.expect(UpdateNotifierService.UPDATE_NOTIFIER_SLEEP_DAYS > 0).to.be.true;
      });

    });

    describe('.shouldCheckForUpdates()', function() {

      let UpdateNotifierService;

      beforeEach(angular.mock.inject(function(_UpdateNotifierService_) {
        UpdateNotifierService = _UpdateNotifierService_;
      }));

      const UPDATE_NOTIFIER_SLEEP_MS = units.daysToMilliseconds(packageJSON.updates.sleepDays);

      _.each([

        // Given the `lastSleptUpdateNotifier` was never updated

        {
          options: {
            lastSleptUpdateNotifier: undefined,
            lastSleptUpdateNotifierVersion: undefined,
            releaseType: release.RELEASE_TYPE.PRODUCTION
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: undefined,
            lastSleptUpdateNotifierVersion: undefined,
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: undefined,
            lastSleptUpdateNotifierVersion: undefined,
            releaseType: release.RELEASE_TYPE.UNKNOWN
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: undefined,
            lastSleptUpdateNotifierVersion: packageJSON.version,
            releaseType: release.RELEASE_TYPE.PRODUCTION
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: undefined,
            lastSleptUpdateNotifierVersion: packageJSON.version,
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: undefined,
            lastSleptUpdateNotifierVersion: packageJSON.version,
            releaseType: release.RELEASE_TYPE.UNKNOWN
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: undefined,
            lastSleptUpdateNotifierVersion: '0.0.0',
            releaseType: release.RELEASE_TYPE.PRODUCTION
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: undefined,
            lastSleptUpdateNotifierVersion: '0.0.0',
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: undefined,
            lastSleptUpdateNotifierVersion: '0.0.0',
            releaseType: release.RELEASE_TYPE.UNKNOWN
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: undefined,
            lastSleptUpdateNotifierVersion: '99.9.9',
            releaseType: release.RELEASE_TYPE.PRODUCTION
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: undefined,
            lastSleptUpdateNotifierVersion: '99.9.9',
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: undefined,
            lastSleptUpdateNotifierVersion: '99.9.9',
            releaseType: release.RELEASE_TYPE.UNKNOWN
          },
          expected: true
        },

        // Given the `lastSleptUpdateNotifier` was very recently updated

        {
          options: {
            lastSleptUpdateNotifier: Date.now() - 1000,
            lastSleptUpdateNotifierVersion: packageJSON.version,
            releaseType: release.RELEASE_TYPE.PRODUCTION
          },
          expected: false
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() - 1000,
            lastSleptUpdateNotifierVersion: packageJSON.version,
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() - 1000,
            lastSleptUpdateNotifierVersion: packageJSON.version,
            releaseType: release.RELEASE_TYPE.UNKNOWN
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() - 1000,
            lastSleptUpdateNotifierVersion: '0.0.0',
            releaseType: release.RELEASE_TYPE.PRODUCTION
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() - 1000,
            lastSleptUpdateNotifierVersion: '0.0.0',
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() - 1000,
            lastSleptUpdateNotifierVersion: '0.0.0',
            releaseType: release.RELEASE_TYPE.UNKNOWN
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() - 1000,
            lastSleptUpdateNotifierVersion: '99.9.9',
            releaseType: release.RELEASE_TYPE.PRODUCTION
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() - 1000,
            lastSleptUpdateNotifierVersion: '99.9.9',
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() - 1000,
            lastSleptUpdateNotifierVersion: '99.9.9',
            releaseType: release.RELEASE_TYPE.UNKNOWN
          },
          expected: true
        },

        // Given the `lastSleptUpdateNotifier` was updated in the future

        {
          options: {
            lastSleptUpdateNotifier: Date.now() + 1000,
            lastSleptUpdateNotifierVersion: packageJSON.version,
            releaseType: release.RELEASE_TYPE.PRODUCTION
          },
          expected: false
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() + 1000,
            lastSleptUpdateNotifierVersion: packageJSON.version,
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() + 1000,
            lastSleptUpdateNotifierVersion: packageJSON.version,
            releaseType: release.RELEASE_TYPE.UNKNOWN
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() + 1000,
            lastSleptUpdateNotifierVersion: '0.0.0',
            releaseType: release.RELEASE_TYPE.PRODUCTION
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() + 1000,
            lastSleptUpdateNotifierVersion: '0.0.0',
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() + 1000,
            lastSleptUpdateNotifierVersion: '0.0.0',
            releaseType: release.RELEASE_TYPE.UNKNOWN
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() + 1000,
            lastSleptUpdateNotifierVersion: '99.9.9',
            releaseType: release.RELEASE_TYPE.PRODUCTION
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() + 1000,
            lastSleptUpdateNotifierVersion: '99.9.9',
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() + 1000,
            lastSleptUpdateNotifierVersion: '99.9.9',
            releaseType: release.RELEASE_TYPE.UNKNOWN
          },
          expected: true
        },

        // Given the `lastSleptUpdateNotifier` was updated far in the future

        {
          options: {
            lastSleptUpdateNotifier: Date.now() + UPDATE_NOTIFIER_SLEEP_MS + 1000,
            lastSleptUpdateNotifierVersion: packageJSON.version,
            releaseType: release.RELEASE_TYPE.PRODUCTION
          },
          expected: false
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() + UPDATE_NOTIFIER_SLEEP_MS + 1000,
            lastSleptUpdateNotifierVersion: packageJSON.version,
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() + UPDATE_NOTIFIER_SLEEP_MS + 1000,
            lastSleptUpdateNotifierVersion: packageJSON.version,
            releaseType: release.RELEASE_TYPE.UNKNOWN
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() + UPDATE_NOTIFIER_SLEEP_MS + 1000,
            lastSleptUpdateNotifierVersion: '0.0.0',
            releaseType: release.RELEASE_TYPE.PRODUCTION
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() + UPDATE_NOTIFIER_SLEEP_MS + 1000,
            lastSleptUpdateNotifierVersion: '0.0.0',
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() + UPDATE_NOTIFIER_SLEEP_MS + 1000,
            lastSleptUpdateNotifierVersion: '0.0.0',
            releaseType: release.RELEASE_TYPE.UNKNOWN
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() + UPDATE_NOTIFIER_SLEEP_MS + 1000,
            lastSleptUpdateNotifierVersion: '99.9.9',
            releaseType: release.RELEASE_TYPE.PRODUCTION
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() + UPDATE_NOTIFIER_SLEEP_MS + 1000,
            lastSleptUpdateNotifierVersion: '99.9.9',
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() + UPDATE_NOTIFIER_SLEEP_MS + 1000,
            lastSleptUpdateNotifierVersion: '99.9.9',
            releaseType: release.RELEASE_TYPE.UNKNOWN
          },
          expected: true
        },

        // Given the `lastSleptUpdateNotifier` was updated long ago

        {
          options: {
            lastSleptUpdateNotifier: Date.now() - UPDATE_NOTIFIER_SLEEP_MS - 1000,
            lastSleptUpdateNotifierVersion: packageJSON.version,
            releaseType: release.RELEASE_TYPE.PRODUCTION
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() - UPDATE_NOTIFIER_SLEEP_MS - 1000,
            lastSleptUpdateNotifierVersion: packageJSON.version,
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() - UPDATE_NOTIFIER_SLEEP_MS - 1000,
            lastSleptUpdateNotifierVersion: packageJSON.version,
            releaseType: release.RELEASE_TYPE.UNKNOWN
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() - UPDATE_NOTIFIER_SLEEP_MS - 1000,
            lastSleptUpdateNotifierVersion: '0.0.0',
            releaseType: release.RELEASE_TYPE.PRODUCTION
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() - UPDATE_NOTIFIER_SLEEP_MS - 1000,
            lastSleptUpdateNotifierVersion: '0.0.0',
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() - UPDATE_NOTIFIER_SLEEP_MS - 1000,
            lastSleptUpdateNotifierVersion: '0.0.0',
            releaseType: release.RELEASE_TYPE.UNKNOWN
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() - UPDATE_NOTIFIER_SLEEP_MS - 1000,
            lastSleptUpdateNotifierVersion: '99.9.9',
            releaseType: release.RELEASE_TYPE.PRODUCTION
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() - UPDATE_NOTIFIER_SLEEP_MS - 1000,
            lastSleptUpdateNotifierVersion: '99.9.9',
            releaseType: release.RELEASE_TYPE.SNAPSHOT
          },
          expected: true
        },
        {
          options: {
            lastSleptUpdateNotifier: Date.now() - UPDATE_NOTIFIER_SLEEP_MS - 1000,
            lastSleptUpdateNotifierVersion: '99.9.9',
            releaseType: release.RELEASE_TYPE.UNKNOWN
          },
          expected: true
        }

      ], (testCase) => {

        it(_.join([
          `should return ${testCase.expected} if`,
          `lastSleptUpdateNotifier=${testCase.options.lastSleptUpdateNotifier},`,
          `lastSleptUpdateNotifierVersion=${testCase.options.lastSleptUpdateNotifierVersion}, and`,
          `releaseType=${testCase.options.releaseType}`
        ], ' '), function() {
          m.chai.expect(UpdateNotifierService.shouldCheckForUpdates(testCase.options)).to.equal(testCase.expected);
        });

      });

    });

  });

});

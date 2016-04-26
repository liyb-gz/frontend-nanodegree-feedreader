/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

/* global $, describe, it, expect, beforeEach, allFeeds, loadFeed*/
'use strict';

$(function() {
	/* This is our first test suite - a test suite just contains
	* a related set of tests. This suite is all about the RSS
	* feeds definitions, the allFeeds variable in our application.
	*/
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* This is a test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		 it('URLs are defined', function() {
			allFeeds.forEach(function (feed) {
				expect(feed.url).toBeDefined(); // Make sure it is defined
				expect(feed.url.length).toBeGreaterThan(0); // Make sure it is not empty
			});
		 });

		/* This is a test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('Names are defined', function() {
			allFeeds.forEach(function (feed) {
				expect(feed.name).toBeDefined(); // Make sure it is defined
				expect(feed.name.length).toBeGreaterThan(0); // Make sure it is not empty
			});
		 });
	});

	/* A test suite named "The menu" */
	describe('The Menu', function () {
		/* This is a test that ensures the menu element is
		 * hidden by default.
		 */
		it('should be hidden by default', function () {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

		/* This is a test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * should have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
		it('should change visibility when menu icon is clicked', function () {
	 		$('.menu-icon-link').trigger('click');
	 		expect($('body').hasClass('menu-hidden')).toBe(false);
	 		$('.menu-icon-link').trigger('click');
	 		expect($('body').hasClass('menu-hidden')).toBe(true);
		});

	});

	/* This is a new test suite named "Initial Entries" */
	describe('Initial Entries', function () {
		/* This is a test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * Remember, loadFeed() is asynchronous so this test will require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
		beforeEach(function (done) {
			loadFeed(0, done);
		});

		it('should be loaded into the ".feed" container', function (done) {
			expect($('.feed .entry').length).toBeGreaterThan(0);
			done();
		});
	});

	/* This is a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function () {
		/* This is a test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 * Remember, loadFeed() is asynchronous.
		 */
		var feedContentLoaded, newFeedContent;

		beforeEach(function (done) {
			loadFeed(0, function () {
				feedContentLoaded = $('.feed').html();
				done();
			});
		});

		it('should load new content when a new feed is selected', function (done) {
			loadFeed(1, function () {
				newFeedContent = $('.feed').html();
				expect(newFeedContent).not.toEqual(feedContentLoaded);
				done();
			});
		});
	});
}());

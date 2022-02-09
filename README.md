# Events Calendar for Experience Cloud


**As of:** Winter '22

**Authored By:** George Abboud

**Last Updated:** 11/30/2021

**Reviews and Contributions:**


* * *


# Overview:

![image](https://user-images.githubusercontent.com/8514282/153270849-5af381b9-5bd1-4503-940d-be875314cf93.png)
![image](https://user-images.githubusercontent.com/8514282/153270912-3ea9c17e-2dd1-4fc1-83e4-5979f7f4052f.png)

AppExchange Listing: 
https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000GXgLZUA1

Open-Source Code:
https://github.com/salesforce-experiencecloud/EventsCalendar


# Description

Display a feature-rich events calendar in your Experience Cloud site! Color-code events at the detail level, scope the date range of what events to show, filter events on who/what/owner Id, configure timezones and offer users real-time event date/time conversion into their selected timezone, control what views to display, and much more! 


### Disclaimer:

This package is free to use, but is not an official [salesforce.com](http://salesforce.com/) product, and should be considered a community project. The functionality is not officially tested or documented, and does not come with any support, warrantees, or updates. It is offered as-is.




# Usage and Configuration

## Create Events from Lightning Experience’s Calendar Tab

![image](https://user-images.githubusercontent.com/8514282/153270997-f8721971-d3a8-4990-b285-5661565059c5.png)

The Calendar for Experience Cloud component is based entirely on the native Salesforce Event/Activity object. From lightning experience, access the Calendar tab, and click “New Event” to start creating events for your calendar!

This app contains an Events object record type called “CC Calendar Event” and an accompanying page layout called “CC Calendar Event Layout”. Using these is optional, but highly recommended, since they do provide a good organization method to differentiate the events displayed in your site’s calendar vs other uses of the Event object in your org. The page layout also provides all the fields necessary to fully control the features provided by the calendar component. 


## Configure Profile Access and Field-level Security

![image](https://user-images.githubusercontent.com/8514282/153271098-545313d5-22aa-4769-bb09-3cf73024c874.png)

The profiles for users who need to be able to view the calendar from the site, will need to be configured with access to activities and Event fields. The profile permission “Access Activities” under “General User Permissions” will need to be checked.

Also, the profile must be configured with Read field-level security for all the fields on the Event object.
![image](https://user-images.githubusercontent.com/8514282/153271153-f56b1696-0e8f-48dc-a571-de4957a14a4b.png)

In addition to the above, you will need to **grant access to this** **Apex Class** “cccalendar.cccalendarController” for every profile that will be accessing this component and will need to render the calendar on an Experience Cloud page.


## Configure Record Access / Sharing for Events

Events do not have their own sharing capabilities, they follow records that they are related to, like the “Related To“ lookup to any object/record or “Name” field which relates an Event to a Lead or a Contact. Assigning an event to a user also grants them access to the Event, if that works for your requirements.

Typically, we see the pattern of relating Events to a record via the “Related To” field to be the one that solves most of the use cases. So for example, I might have a custom object called Custom_Object__c and I might create a record in that Custom Object called “Calendar for Community Users”. Then I would related my Events to the “Calendar for Community Users” record, and share that record with my Community Users via sharing rules or sharing sets, or any sharing mechanism. As soon as my users have access to the “Calendar for Community Users” record, they will gain access to all Events related to that record.


## Guest User / Unauthenticated Sites Configuration

If you want to use the calendar component to expose events to the public in an unauthenticated experience, you can basically follow the same configuration as outlined in the previous sections. Grant the Guest User profile access to the apex controller “cccalendar.cccalendarController”, and share the Custom Object record via Guest User Sharing Rules with your site’s Guest User. When the guest user of your site gains access to the Custom Object record that all Events are related to, they will also gain access to the Events.


## Explanation of Event Custom Fields and Other Key Fields

**Subject**: Title of the event

**Type**: (Optional) If set, the type is prepended to the event subject as a title.

**Event URL Text:** (Optional) You can show up to three buttons on the event detail page/modal. The first is a link to the detail page of the event. The second and third are links defined in the event details. This field controls the text of second button.

**Event URL:** (Optional) You can show up to three buttons on the event detail page/modal. The first is a link to the detail page of the event. The second and third are links defined in the event details. This field controls the URL of second button.

**Event URL Text 2:** (Optional) You can show up to three buttons on the event detail page/modal. The first is a link to the detail page of the event. The second and third are links defined in the event details. This field controls the text of third button.

**Event URL 2:** (Optional) You can show up to three buttons on the event detail page/modal. The first is a link to the detail page of the event. The second and third are links defined in the event details. This field controls the URL of third button.

**Image URL**: (Optional) URL for the image to display in the event details component or modal.

**Event Icon Name**: (Optional) SLDS Icon name to display to the left of the event subject/title on the details component or modal.

**Display Event's Local Timezone**: If checked, the date/time of the event will be displayed in Local Timezone, under the title on the details component or modal.

**Local Timezone**: The local timezone to display under the event title if that option is checked.

**Location**: (Optional) Location of event is displayed on the details component or modal.

**Calendar Text Color**: The color of the title text of the event in the calendar component.

**Calendar Background Color**: The color of the background of the event title in the calendar component.

**Calendar Rendering**: Event rendering in calendar - leave set to Normal.

**Calendar Border Color**: Border color of the event title in the calendar component.



## Calendar for Experience Cloud component for Experience Builder

**Component Label**: Calendar for Experience Cloud
**Component Aura API Name**: cccalendar
**Component LWC API Name**: cccalendar
**Component Namespace**: cccalendar
**Component Properties:**


|Property Label|Aura Property API Name|LWC Property API Name|Type|Description|
|---	|---	|---	|---	|---	|
|Number of past months|pastMonths	|past-months	|Integer	|(required) Set the number of months in the past to retrieve events for.	|
|Number of future months	|futureMonths	|future-months	|Integer	|(required) Set the number of months in the future to retrieve events for.	|
|Range Frequency	|rangeFrequency	|range-frequency	|String	|(required) Select the past/future range frequency (MONTH or DAY).	|
|Max number of events to retrieve	|eventLimit	|event-limit	|Integer	|(required) Set the maximum number of events to retrieve.	|
|What Id / Related To Filter	|whatId	|what-id	|String	|If set, the events will be filtered on the What Id / Related To field.	|
|Who Id / Name Filter	|whoId	|who-id	|String	|If set, the events will be filtered on the Who Id / Name field.	|
|Owner Id / Assigned To Filter	|ownerId	|owner-id	|String	|If set, the events will be filtered on the Owner Id / Assigned To field.	|
|Timezone Labels JSON	|timezoneLabelsJSON	|timezone-labels-j-s-o-n	|String	|JSON String representing a map of labels of timezones. Example: {"America/Los_Angeles":"US Pacific Time","America/Chicago":"US Central Time","America/Denver":"US Mountain Time","America/Indianapolis":"US Eastern Time","GMT":"GMT","Asia/Jakarta":"Western Indonesian Time","Asia/Makassar":"Central Indonesian Time","Asia/Jayapura":"Eastern Indonesian Time","Asia/Kolkata":"India Standard Time","Asia/Tokyo":"Japan Time","Australia/Sydney":"Australian Eastern Standard Time","Australia/Darwin":"Australian Central Standard Time","Australia/Perth":"Australian Western Standard Time","Europe/London":"British Time","Europe/Paris":"Central European Time"}	|
|Override List of Timezones	|overrideTimezoneList	|override-timezone-list	|Boolean	|If set, supply a comma separated list of timezone values in the next property to override the timezone list with.	|
|List of Timezones Override	|listofTimezonesOverride	|listof-timezone-overrides	|String	|If Override List of Timezones is checked, pass comma separated values of timezones to override with. Example: America/Los_Angeles,America/Chicago,America/Denver,America/Indianapolis,GMT,Europe/London,Europe/Paris,Asia/Jakarta,Asia/Makassar,Asia/Jayapura,Asia/Kolkata,Asia/Tokyo,Australia/Sydney,Australia/Darwin,Australia/Perth	|
|Hide Event Detail Button	|hideEventDetailButton	|hide-event-detail-button	|Boolean	|Hide Event Detail (More Info) Button	|
|Display Buttons at the Bottom	|buttonsOnBottom	|buttons-on-bottom	|Boolean	|Check to display the buttons at the bottom instead of above the content. Defaults to false.	|
|Event Detail Button Text	|eventDetailButtonText	|event-detail-button-text	|String	|Text for the event detail button, defaults to 'More Info'.	|
|Show Weekends	|showWeekends	|show-weekends	|Boolean	|Show Saturday/Sunday weekend days.	|
|Hide Month View	|hideMonthView	|hide-month-view	|Boolean	|Hide Month view on calendar.	|
|Hide Week View	|hideWeekView	|hide-week-view	|Boolean	|Hide Week view on calendar.	|
|Hide Day View	|hideDayView	|hide-day-view	|Boolean	|Hide Day view on calendar.	|
|Hide List View	|hideListView	|hide-list-view	|Boolean	|Hide List view on calendar.	|
|	|	|	|	|	|


**Component Label**: Calendar Event Details for Experience Cloud
**Component Aura API Name**: cceventDetails
**Component LWC API Name**: ccevent-details
**Component Namespace**: cccalendar
**Component Properties:**


|Property Label	|Aura Property API Name	|LWC Property API Name	|Type	|Description	|
|---	|---	|---	|---	|---	|
|Event Record Id	|recordId	|record-id	|String	|(required) Event record Id. Set to {!recordId} on the event detail page to dynamically pass the value in.	|
|Hide Event Detail Button	|hideEventDetailButton	|hide-event-detail-button	|Boolean	|Hide Event Detail (More Info) Button	|
|Event Detail Button Text	|eventDetailButtonText	|event-detail-button-text	|String	|Text for the event detail button, defaults to 'More Info'.	|
|Hide Header Border	|noHeaderBorder	|no-header-border	|Boolean	|Hide the header border	|
|N/A	|truncate	|truncate	|Boolean	|When true, truncates title, location, and description for upcoming events use in a sidebar	|
|Display Buttons at the Bottom	|buttonsOnBottom	|buttons-on-bottom	|Boolean	|Check to display the buttons at the bottom instead of above the content. Defaults to false.	|


**Component Label**: Calendar Upcoming Events
**Component Aura API Name**: ccUpcomingEvents
**Component LWC API Name**: cc-upcoming-events
**Component Namespace**: cccalendar
**Component Properties**:


|Property Label	|Aura Property API Name	|LWC Property API Name	|Type	|Description	|
|---	|---	|---	|---	|---	|
|Max number of events to retrieve	|eventLimit	|event-limit	|Integer	|(required) Set the maximum number of events to retrieve.	|
|What Id / Related To Filter	|whatId	|what-id	|String	|If set, the events will be filtered on the What Id / Related To field.	|
|Who Id / Name Filter	|whoId	|who-id	|String	|If set, the events will be filtered on the Who Id / Name field.	|
|Owner Id / Assigned To Filter	|ownerId	|owner-id	|String	|If set, the events will be filtered on the Owner Id / Assigned To field.	|
|Event Detail Button Text	|eventDetailButtonText	|event-detail-button-text	|String	|Text for the event detail button, defaults to 'More Info'.	|
|Timezone Labels JSON	|timezoneLabelsJSON	|timezone-labels-j-s-o-n	|String	|JSON String representing a map of labels of timezones. Example: {"America/Los_Angeles":"US Pacific Time","America/Chicago":"US Central Time","America/Denver":"US Mountain Time","America/Indianapolis":"US Eastern Time","GMT":"GMT","Asia/Jakarta":"Western Indonesian Time","Asia/Makassar":"Central Indonesian Time","Asia/Jayapura":"Eastern Indonesian Time","Asia/Kolkata":"India Standard Time","Asia/Tokyo":"Japan Time","Australia/Sydney":"Australian Eastern Standard Time","Australia/Darwin":"Australian Central Standard Time","Australia/Perth":"Australian Western Standard Time","Europe/London":"British Time","Europe/Paris":"Central European Time"}	|
|Display Buttons at the Bottom	|buttonsOnBottom	|buttons-on-bottom	|Boolean	|Check to display the buttons at the bottom instead of above the content. Defaults to false.	|




# Features

1. Select the number of months in the past and future, as well as the number of events to retrieve within that range.
2. Filter events on Related To (WhatId), Name (WhoId), and Assigned To (OwnerId).
3. Configure what timezones to display and their labels.
4. Control and display button links to your events (up to three including the detail page of the event).
5. Hide or display weekend days, and calendar views (Month, Week, Day, List).
6. Color-code your events and event series
7. Choose images and icons to display in the details of your event
8. Display the local timezone in the details of your event
9. LWR-Ready






# Release Log

### Version 1.14

Installation URL: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3h000004ReNk 

* LWR Ready
* Removed package requirement for “portals” / Experience Cloud licenses



### Version 1.13 (DEPRECATED)

Installation URL: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3h000004RdyA 

* Styling fixes
* Fixed past events detail pages not displaying



### Version 1.12 (DEPRECATED)

Installation URL: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3h000004RdpN

* Fix a bug when users have non en_US locale with not showing the events on the right date/time



### Version 1.11 (DEPRECATED)

Installation URL: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3h000004jrsw 

* Fix on calendar re-render causing multiple day/week/month/list buttons to display



### Version 1.10 (DEPRECATED)

Installation URL: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3h000004jref

* Fix on Event page layout, removed related Content mobile card which was causing errors installing in some orgs



### Version 1.9 (DEPRECATED)

Installation URL: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3h000004jqhA 

* Accessibility fixes



### Version 1.8 (DEPRECATED)

Installation URL: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3h000004jqgv 

* Added configuration for truncation settings
* Applied some styling fixes



### Version 1.7 (DEPRECATED)

Installation URL: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3h000001RYDU  

* Added configuration to display buttons below event description, or default to top
* Fixed bug with event detail component that limited viewing event details to just within an upcoming month



### Version 1.6 (DEPRECATED)

Installation URL: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3h000001RXdp 

* Updated jquery to 3.5.1 (most recent version at the time)
* Added Calendar Upcoming Events component that display a running list of events. Target use on a sidebar.
* Added RelaxedCSP capability for all LWC components
* Styling updates



### Version 1.5 (DEPRECATED)

Installation URL: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3h000001RX9X 

* Addressed a few minor issues that came back from security review



### Version 1.4 (DEPRECATED)

Installation URL: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3h000001RX9S 

* Initial Release


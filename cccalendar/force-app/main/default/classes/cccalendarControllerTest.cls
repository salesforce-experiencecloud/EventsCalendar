/*
 * Copyright (c) 2022, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

@IsTest
public class cccalendarControllerTest {
    
    @testSetup static void testSetupMethod()
    {
        Account acc = new Account();
        if(Schema.sObjectType.Account.fields.Name.isCreateable() && Schema.sObjectType.Account.isCreateable())
        {
            acc.Name = 'test';
            insert acc;
        }

        Contact con = new Contact();
        if(Schema.sObjectType.Contact.fields.FirstName.isCreateable() && 
        Schema.sObjectType.Contact.fields.LastName.isCreateable() && 
        Schema.sObjectType.Contact.fields.AccountId.isCreateable() && Schema.sObjectType.Contact.isCreateable())
        {
            con.firstName = 'testF';
            con.lastName = 'testL';
            con.accountId = acc.Id;
            insert con;
        }

        Event ev = new Event();
        if(Schema.sObjectType.Event.fields.Subject.isCreateable() && 
        Schema.sObjectType.Event.fields.WhoId.isCreateable() && 
        Schema.sObjectType.Event.fields.WhatId.isCreateable() && 
        Schema.sObjectType.Event.fields.OwnerId.isCreateable() && 
        Schema.sObjectType.Event.fields.StartDateTime.isCreateable() && 
        Schema.sObjectType.Event.fields.EndDateTime.isCreateable() && Schema.sObjectType.Event.isCreateable())
        {
            ev.Subject = 'test';
            ev.WhoId = con.Id;
            ev.WhatId = acc.Id;
            ev.OwnerId = System.UserInfo.getUserId();
            ev.StartDateTime=system.today();
            ev.EndDateTime=system.today()+5;

            insert ev;
        }
        
    }

    public static testMethod void test_getEvents_cccalendarController()
    {
        System.assertEquals(true, Schema.sObjectType.Account.fields.Name.isAccessible() && Schema.sObjectType.Account.isAccessible());
        System.assertEquals(true, Schema.sObjectType.Contact.fields.FirstName.isAccessible() && Schema.sObjectType.Contact.fields.LastName.isAccessible() && Schema.sObjectType.Contact.isAccessible());
        System.assertEquals( true, Schema.sObjectType.Event.fields.Subject.isAccessible() && Schema.sObjectType.Event.isAccessible());

        Account acc = [SELECT Id from Account WHERE Name = 'test' LIMIT 1];
        Contact con = [Select Id from contact where FirstName = 'testF' and LastName = 'testL' LIMIT 1];
        Event ev = [Select Id from event where subject = 'test' LIMIT 1];

        System.Test.startTest();

        String eventJSON = cccalendarController.getEvents(6, 6, 10, acc.Id, con.Id, System.UserInfo.getUserId(), ev.Id);

        Map<String,Object> eventObjectMap = (Map<String,Object>) System.JSON.deserializeUntyped(eventJSON);

        System.Test.stopTest();

        System.assertEquals(null, eventObjectMap.get('error'));
        System.assertNotEquals(null, eventObjectMap.get('eventsMap'));
        System.assertNotEquals(null, eventObjectMap.get('timezoneList'));

    }

    public static testMethod void test_getUpcomingEvents_cccalendarController()
    {
        System.assertEquals(true, Schema.sObjectType.Account.fields.Name.isAccessible() && Schema.sObjectType.Account.isAccessible());
        System.assertEquals(true, Schema.sObjectType.Contact.fields.FirstName.isAccessible() && Schema.sObjectType.Contact.fields.LastName.isAccessible() && Schema.sObjectType.Contact.isAccessible());
        System.assertEquals( true, Schema.sObjectType.Event.fields.Subject.isAccessible() && Schema.sObjectType.Event.isAccessible());

        Account acc = [SELECT Id from Account WHERE Name = 'test' LIMIT 1];
        Contact con = [Select Id from contact where FirstName = 'testF' and LastName = 'testL' LIMIT 1];
        Event ev = [Select Id from event where subject = 'test' LIMIT 1];

        System.Test.startTest();

        String eventJSON = cccalendarController.getUpcomingEvents(10, acc.Id, con.Id, System.UserInfo.getUserId(), ev.Id);

        Map<String,Object> eventObjectMap = (Map<String,Object>) System.JSON.deserializeUntyped(eventJSON);

        System.Test.stopTest();

        System.assertEquals(null, eventObjectMap.get('error'));
        System.assertNotEquals(null, eventObjectMap.get('eventsMap'));
        System.assertNotEquals(null, eventObjectMap.get('timezoneList'));

    }

    public static testMethod void test_getEventsWithFrequency_cccalendarController()
    {
        System.assertEquals(true, Schema.sObjectType.Account.fields.Name.isAccessible() && Schema.sObjectType.Account.isAccessible());
        System.assertEquals(true, Schema.sObjectType.Contact.fields.FirstName.isAccessible() && Schema.sObjectType.Contact.fields.LastName.isAccessible() && Schema.sObjectType.Contact.isAccessible());
        System.assertEquals( true, Schema.sObjectType.Event.fields.Subject.isAccessible() && Schema.sObjectType.Event.isAccessible());

        Account acc = [SELECT Id from Account WHERE Name = 'test' LIMIT 1];
        Contact con = [Select Id from contact where FirstName = 'testF' and LastName = 'testL' LIMIT 1];
        Event ev = [Select Id from event where subject = 'test' LIMIT 1];

        System.Test.startTest();

        String eventJSON = cccalendarController.getEventsWithFrequency(0, 1, 'MONTH', 10, acc.Id, con.Id, System.UserInfo.getUserId(), ev.Id);

        Map<String,Object> eventObjectMap = (Map<String,Object>) System.JSON.deserializeUntyped(eventJSON);

        System.Test.stopTest();

        System.assertEquals(null, eventObjectMap.get('error'));
        System.assertNotEquals(null, eventObjectMap.get('eventsMap'));
        System.assertNotEquals(null, eventObjectMap.get('timezoneList'));

    }

}
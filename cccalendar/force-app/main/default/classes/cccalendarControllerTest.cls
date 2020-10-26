@IsTest
public class cccalendarControllerTest {
    
    @testSetup static void testSetupMethod()
    {
        Account acc = new Account();
        acc.Name = 'test';
        insert acc;

        Contact con = new Contact();
        con.firstName = 'testF';
        con.lastName = 'testL';
        insert con;

        Event ev = new Event();
        ev.Subject = 'test';
        ev.WhoId = con.Id;
        ev.WhatId = acc.Id;
        ev.OwnerId = System.UserInfo.getUserId();
        ev.StartDateTime=system.today();
        ev.EndDateTime=system.today()+5;

        insert ev;
    }

    public static testMethod void test_success_cccalendarController()
    {
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

}

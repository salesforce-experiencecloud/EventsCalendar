global with sharing class cccalendarController {
    
    @AuraEnabled
    global static String getEvents(Integer pastMonths, Integer futureMonths, Integer eventLimit, String whatId, String whoId, String ownerId, String recordId)
    {
        Map<String,Object> resultMap = new Map<String,Object>();
        Boolean eventAccess = Event.sObjectType.getDescribe().isAccessible();
        Boolean eventFLS = checkEventFLSisAccessible();
        String accessError = '';
        accessError += (!eventAccess) ? 'Profile has no access to Event/Activities object. Enable the "Access Activities" permission on the profile. ' : '';
        accessError += (!eventFLS) ? 'Profile does not have proper FLS access to Event object. Grant Read Access to the fields on the Event object for the profile.' : '';
        if(!eventAccess
                || !eventFLS
            )
        {
            resultMap.put('error', accessError);
            return System.JSON.serialize(resultMap);
        }

        Id whatIdID;
        if(whatId != null && whatId.trim() != '')
        {
            try {
                whatIdID = whatId;
            }catch(Exception e){}
        }

        Id whoIdID;
        if(whoId != null && whoId.trim() != '')
        {
            try {
                whoIdID = whoId;
            }catch(Exception e){}
        }

        Id ownerIdID;
        if(ownerId != null && ownerId.trim() != '')
        {
            try {
                ownerIdID = ownerId;
            }catch(Exception e){}
        }

        Id recordIdID;
        if(recordId != null && recordId.trim() != '')
        {
            try {
                recordIdID = recordId;
            }catch(Exception e){}
        }

        String query = 'SELECT ';
        
        String fields = 'Id,IsAllDayEvent,ActivityDate,Description,EndDateTime,Location,StartDateTime,Subject,Type,';
        fields += 'cccalendar__Calendar_Background_Color__c,cccalendar__Calendar_Border_Color__c,cccalendar__Calendar_Rendering__c,';
        fields += 'cccalendar__Calendar_Text_Color__c,cccalendar__Display_Events_Local_Timezone__c,cccalendar__Event_URL__c,cccalendar__Event_URL_Text__c,';
        fields += 'cccalendar__Event_URL_2__c, cccalendar__Event_URL_Text_2__c, cccalendar__Image_URL__c,cccalendar__Local_Timezone__c, cccalendar__Event_Icon_Name__c';

        query += fields;
        query += ' FROM Event WHERE ';
        query += ' ((EndDateTime >= LAST_N_MONTHS:' + String.valueOf(pastMonths) + ' AND ';
        query += ' EndDateTime <= NEXT_N_MONTHS:' + String.valueOf(futureMonths) + ') OR EndDateTime = TODAY)';


        query += (whatIdID != null) ? ' AND whatId = \'' + whatIdID + '\' ' : '';
        query += (whoIdID != null) ? ' AND whoId = \'' + whoIdID + '\' ' : '';
        query += (ownerIdID != null) ? ' AND ownerId = \'' + ownerIdID + '\' ' : '';
        query += (recordIdID != null) ? ' AND Id = \'' + recordIdID + '\' ' : '';
        
        query += ' ORDER BY StartDateTime ASC';
        
        query += ' LIMIT ' + String.valueOf(eventLimit);

        Map<Id, Event> eventsMap = new Map<Id, Event>(
        (List<Event>)Database.query(query)
        );

        resultMap.put('eventsMap', eventsMap);
        resultMap.put('timezoneList',getTimezones());
        resultMap.put('siteUrl', System.Site.getBaseUrl());

        /*
        List<SiteDetail> siteDetailList = [SELECT DurableId, SecureUrl FROM SiteDetail WHERE DurableId = :System.Site.getSiteId()];
        if(siteDetailList.size() > 0)
        {
            resultMap.put('siteUrl', siteDetailList[0].SecureUrl);
            
        }
        */

        return System.JSON.serialize(resultMap);
    }


    private static List<String> getTimezones()
    {
        List<String> timezoneList = new List<String>();
        Schema.DescribeFieldResult F = Event.cccalendar__Local_Timezone__c.getDescribe();
        Schema.sObjectField T = F.getSObjectField();
        List<PicklistEntry> entries = T.getDescribe().getPicklistValues();
        for(PicklistEntry pe : entries)
        {
            timezoneList.add(pe.getValue());
        }
        return timezoneList;
    }

    private static Boolean checkEventFLSisAccessible()
    {
        return (
            Schema.sObjectType.Event.fields.Subject.isAccessible()
            && Schema.sObjectType.Event.fields.IsAllDayEvent.isAccessible()
            && Schema.sObjectType.Event.fields.ActivityDate.isAccessible()
            && Schema.sObjectType.Event.fields.Description.isAccessible()
            && Schema.sObjectType.Event.fields.EndDateTime.isAccessible()
            && Schema.sObjectType.Event.fields.Location.isAccessible()
            && Schema.sObjectType.Event.fields.StartDateTime.isAccessible()
            && Schema.sObjectType.Event.fields.Type.isAccessible()
            && Schema.sObjectType.Event.fields.cccalendar__Calendar_Background_Color__c.isAccessible()
            && Schema.sObjectType.Event.fields.cccalendar__Calendar_Border_Color__c.isAccessible()
            && Schema.sObjectType.Event.fields.cccalendar__Calendar_Rendering__c.isAccessible()
            && Schema.sObjectType.Event.fields.cccalendar__Calendar_Text_Color__c.isAccessible()
            && Schema.sObjectType.Event.fields.cccalendar__Display_Events_Local_Timezone__c.isAccessible()
            && Schema.sObjectType.Event.fields.cccalendar__Event_URL__c.isAccessible()
            && Schema.sObjectType.Event.fields.cccalendar__Event_URL_Text__c.isAccessible()
            && Schema.sObjectType.Event.fields.cccalendar__Event_URL_2__c.isAccessible()
            && Schema.sObjectType.Event.fields.cccalendar__Event_URL_Text_2__c.isAccessible()
            && Schema.sObjectType.Event.fields.cccalendar__Image_URL__c.isAccessible()
            && Schema.sObjectType.Event.fields.cccalendar__Local_Timezone__c.isAccessible()
            && Schema.sObjectType.Event.fields.cccalendar__Event_Icon_Name__c.isAccessible()
        );
    }


}
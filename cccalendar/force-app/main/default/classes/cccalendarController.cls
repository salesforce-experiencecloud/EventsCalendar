global with sharing class cccalendarController {
    
    @AuraEnabled
    global static String getEvents(Integer pastMonths, Integer futureMonths, Integer eventLimit, String whatId, String whoId, String ownerId)
    {
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

        Map<String,Object> resultMap = new Map<String,Object>();
        String query = 'SELECT ';
        
        String fields = 'Id,IsAllDayEvent,ActivityDate,Description,EndDateTime,Location,StartDateTime,Subject,Type,';
        fields += 'cccalendar__Calendar_Background_Color__c,cccalendar__Calendar_Border_Color__c,cccalendar__Calendar_Rendering__c,';
        fields += 'cccalendar__Calendar_Text_Color__c,cccalendar__Display_Events_Local_Timezone__c,cccalendar__Event_URL__c,cccalendar__Event_URL_Text__c,';
        fields += 'cccalendar__Image_URL__c,cccalendar__Local_Timezone__c, cccalendar__Event_Icon_Name__c';

        query += fields;
        query += ' FROM Event WHERE ';
        query += ' (EndDateTime >= LAST_N_MONTHS:' + String.valueOf(pastMonths) + ' OR ';
        query += ' EndDateTime <= NEXT_N_MONTHS:' + String.valueOf(futureMonths) + ' OR EndDateTime = TODAY)';


        query += (whatIdID != null) ? ' AND whatId = \'' + whatIdID + '\' ' : '';
        query += (whoIdID != null) ? ' AND whoId = \'' + whoIdID + '\' ' : '';
        query += (ownerIdID != null) ? ' AND ownerId = \'' + ownerIdID + '\' ' : '';
        
        query += ' ORDER BY StartDateTime ASC';
        
        query += ' LIMIT ' + String.valueOf(eventLimit);

        Map<Id, Event> eventsMap = new Map<Id, Event>(
        (List<Event>)Database.query(query)
        );

        resultMap.put('eventsMap', eventsMap);
        resultMap.put('timezoneList',getTimezones());

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


}
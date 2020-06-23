public with sharing class cccalendarController {
    
    @AuraEnabled
    public static String getEvents(Integer pastMonths, Integer futureMonths, Integer eventLimit)
    {
        Map<String,Object> resultMap = new Map<String,Object>();
        String query = 'SELECT ';
        
        String fields = 'Id, Name,IsAllDayEvent,ActivityDate,Description,EndDateTime,Location,StartDateTime,Subject,Type,';
        fields += 'cccalendar__Calendar_Background_Color__c,cccalendar__Calendar_Border_Color__c,cccalendar__Calendar_Rendering__c,';
        fields += 'cccalendar__Calendar_Text_Color__c,cccalendar__Display_Events_Local_Timezone__c,cccalendar__Event_URL__c,cccalendar__Event_URL_Text__c,';
        fields += 'cccalendar__Image_URL__c,cccalendar__Local_Timezone__c';

        query += fields;
        query += ' FROM Event WHERE EndDateTime >= LAST_N_MONTHS:' + String.valueOf(pastMonths) + ' OR ';
        query += ' EndDateTime <= NEXT_N_MONTHS:' + String.valueOf(futureMonths) + ' OR EndDateTime = TODAY';
        
        query += ' ORDER BY StartDateTime ASC';
        
        query += ' LIMIT ' + String.valueOf(eventLimit);

        Map<Id, Event> eventMap = new Map<Id, Event>(
        (List<Event>)Database.query(query)
        );

        resultMap.put('eventMap', eventMap);

        return System.JSON.serialize(resultMap);
    }


}

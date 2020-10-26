import { LightningElement, api, track } from 'lwc';

export default class CceventDetailsModal extends LightningElement {

    @api event;

    @api 
    get eventDetailSectionSize()
    {
        return (this.event !== undefined && this.event.eventImageURL !== undefined && this.event.eventImageURL !== null && this.event.eventImageURL.trim() !== '') ? '8' : '12' ;
    }

    connectedCallback()
    {
        if(this.event !== undefined && this.event !== null)
        {
            this.event = JSON.parse(JSON.stringify(this.event));

        }
    }

    handleCloseDetailsModal(e)
    {
        e.preventDefault();
        const closeModalDetailsEvent = new CustomEvent('closedetailsmodalevent');
        this.dispatchEvent(closeModalDetailsEvent);
    }

}
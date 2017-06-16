import BaseStore                from './BaseStore';
import AppDispatcher            from '../dispatchers/AppDispatcher';
import EventConstants           from '../constants/EventConstants';


var BreadcrumbStore = Object.assign({}, BaseStore, {
    selectedProjects        : [],
    selectedCampaigns       : [],
    selectedSiteOffers      : [],
    selectedInsertions      : [],
    selectedConversions     : [],
    selectedReports         : [],


    getSelectedConversions() {
        return this.selectedConversions;
    },

    updateSelectedConversions(conversionIds) {
        this.selectedConversions = conversionIds;
        this.emitChange();
    },

    getSelectedProjects() {
        return this.selectedProjects;
    },

    getFullBreadCrumb() {
        let full = [];
        full['projects']    =   this.selectedProjects;
        full['campaigns']   =   this.selectedCampaigns;
        full['siteoffers']  =   this.selectedSiteOffers;
        full['insertions']  =   this.selectedInsertions;
        full['conversions'] =   this.selectedConversions;
        full['report']      =   this.selectedReports;
        return full;
    },
    getSelectedReports() {
        return this.selectedReports;
    },

    updateSelectedReports(reportsIds) {
        this.selectedReports = reportsIds;
        this.emitChange();
    },

    updateSelectedProjects(projectIds) {
        this.selectedProjects   = projectIds;
        this.selectedCampaigns  = [];
        this.selectedSiteOffers = [];
        this.selectedInsertions = [];
        this.emitChange();
    },

    getSelectedCampaigns() {
        return this.selectedCampaigns;
    },

    updateSelectedCampaigns(campaignIds) {
        this.selectedCampaigns = campaignIds;
        this.selectedSiteOffers = [];
        this.selectedInsertions = [];
        this.emitChange();
    },

    getSelectedSiteOffers() {
        return this.selectedSiteOffers;
    },

    updateSelectedSiteOffers(siteofferIds) {
        this.selectedSiteOffers = siteofferIds;
        this.selectedInsertions = [];
        this.emitChange();
    },

    getSelectedInsertions() {
        return this.selectedInsertions;
    },

    updateSelectedInsertions(insertionIds) {
        this.selectedInsertions = insertionIds;
        this.emitChange();
    },

});

export default BreadcrumbStore;

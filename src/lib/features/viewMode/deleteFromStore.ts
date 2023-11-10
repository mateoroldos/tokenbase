import { get } from 'svelte/store';
import designTokensGroupStore from '../token-groups-store/groups';
import { page } from '$app/stores';
import { preview } from './stores/preview';

const deleteDesignSystem = (designSystemIdToDelete: string) => {
    const pagesub = page.subscribe(($page) => {
        let designSystemId  = $page.params.designSystemId;
        const previewsub = preview.subscribe((previewValue: boolean) => {
            if(designSystemId !== designSystemIdToDelete && previewValue && designSystemId === undefined){
                const currentGroups = get(designTokensGroupStore);
                const updatedGroups = currentGroups.filter(group => group.parentGroup !== designSystemIdToDelete);
                designTokensGroupStore.set(updatedGroups);
            }
        });
        previewsub();
    });
    pagesub();
};

export default deleteDesignSystem;

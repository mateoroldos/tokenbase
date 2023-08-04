<script lang="ts">
	import { buttonVariants } from '$components/ui/button'
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$components/ui/dialog'
	import { BookCopy } from 'lucide-svelte'
    import { Textarea } from "$components/ui/textarea";
	import Button from '$components/ui/button/Button.svelte'
    import { page } from '$app/stores';
    import importStyleDictionary from '../import-style-dictionary/importStyleDictionary'
	import InputFiles from '$components/ui/input/InputFiles.svelte'

    let json: string;
    let desingSystemId: string;
    let jsonFile: File;

    function handleSubmit(event: Event) {   
            const textarea = event.target as HTMLTextAreaElement;
            json = textarea.value;
            desingSystemId = $page.params.designSystemId as string 
       
	}

    const createDesignSystemFromJson = async () => {  
        if(jsonFile){         
            return new Promise((resolve, reject) => {               
                const fileReader = new FileReader()
                fileReader.readAsText(jsonFile[0])
            fileReader.onload = () => {
                    const desingSystemId = $page.params.designSystemId as string
                    importStyleDictionary(fileReader.result as string, desingSystemId)
                }
            })           
        }else{
            importStyleDictionary(json, desingSystemId);
        }
  };

</script>

<Dialog>
    <DialogTrigger class={buttonVariants({ variant: 'default' })}>
		<BookCopy class="mr-2 h-4 w-4" />
		Upload your file
	</DialogTrigger>
	<DialogContent >
        <DialogHeader>
            <DialogTitle>Add JSON file</DialogTitle>
		</DialogHeader>
        <div class="flex flex-row flex-wrap gap-4">           
    <InputFiles id="picture" bind:files={jsonFile} />        
        </div>
        <div class="flex items-center w-full gap-6">
            <span class="line"></span> <p class="text-zinc-300 text-xs">OR</p> <span class="line"></span>
        </div>
			<div class="flex flex-row flex-wrap gap-4">
				<Textarea on:input={handleSubmit} placeholder="Type your JSON here." />
			</div>	
        <Button on:click={createDesignSystemFromJson}>Upload</Button>
	</DialogContent>
</Dialog>

<style lang="scss">
    .line{
        width: 100%;
        border: 1px solid #e7e7e9;
    }

</style>

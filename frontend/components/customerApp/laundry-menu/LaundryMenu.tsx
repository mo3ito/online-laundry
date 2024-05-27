import MenuItem from "./LaundryMenuItem";

type LaundryMenuProps = {
  title: string,
}

export default function LaundryMenu({title }: LaundryMenuProps) {
  return (
    <div className="">
      <h1 className="w-full bg-sky-500 p-3 my-4 text-center text-white">
        {title}
      </h1>
      <ul className="w-full mt-8 px-8 flex items-center justify-center sm:justify-around flex-wrap">
        <MenuItem
          srcImage="/images/washing-machine.jpg"
          imageCaption="مردانه"
          
        />
                <MenuItem
          srcImage="/images/washing-machine.jpg"
          imageCaption="مردانه"
          
        />        <MenuItem
        srcImage="/images/washing-machine.jpg"
        imageCaption="مردانه"
        
      />        <MenuItem
      srcImage="/images/washing-machine.jpg"
      imageCaption="مردانه"
      
    />        <MenuItem
    srcImage="/images/washing-machine.jpg"
    imageCaption="مردانه"
    
  />        <MenuItem
  srcImage="/images/washing-machine.jpg"
  imageCaption="مردانه"
  
/>        <MenuItem
          srcImage="/images/washing-machine.jpg"
          imageCaption="مردانه"
          
        />        <MenuItem
        srcImage="/images/washing-machine.jpg"
        imageCaption="مردانه"
        
      />        <MenuItem
      srcImage="/images/washing-machine.jpg"
      imageCaption="مردانه"
      
    />        <MenuItem
    srcImage="/images/washing-machine.jpg"
    imageCaption="مردانه"
    
  />

      </ul>
    </div>
  );
}

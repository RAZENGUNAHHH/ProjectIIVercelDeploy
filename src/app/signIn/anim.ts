export const anim_out = {
    initial: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0,
        },
    },
    animate: {
        opacity: 0,
        x: 100,
        transition: {
            delay : 0.3,
            duration: 0.5,
        },
    },
    exit: {
        opacity: 0,
        x: 100,
        transition: {
            duration: 0,
        },
        
    },
};

export const anim_in = {
    initial: {
        opacity: 0,
        x : 100,
        
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            delay : 0.3,
            duration: 0.5,
        },
       
      
    },
    exit: {
        opacity: 0,
        x: 100,
        transition: {
            duration: 0,
        },
    },
};

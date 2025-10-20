import {debounce} from 'lodash';
import React from "react";
import {STOP_TYPING_TIMEOUT} from "@/utils/constants/constants";
import {ANY} from "@/utils/commons/type";

export const useSearchDebounce = ({process}:{process:ANY}) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearchDebounce = React.useCallback(
        debounce((search: string) => {

        }, STOP_TYPING_TIMEOUT),
        [],
    );
    return {handleSearchDebounce}

}
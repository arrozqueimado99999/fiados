import { useMask } from "@react-input/mask";

export function Masks(){
    const dinheiro = useMask({ mask: '+0 (___) ___-__-__', replacement: { _: /\d/ } });
}
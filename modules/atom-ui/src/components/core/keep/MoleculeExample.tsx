import { CodeProps, SmartCode } from "../../atoms/Code";
import { pickSmartSlotSpecs, SmartSlot } from "../SmartSlot";

// STEP 1: Create types for all 3 fields
type CodeSpecsProps = SmartSlot<CodeProps, "code">;

const MoleculeExample = (props: CodeSpecsProps) => {

  // STEP 2: Pick the specs from props {code, codeProps, Code}
  const specs = pickSmartSlotSpecs<CodeProps>(props, "code");

  return (
    <div>
      <SmartCode>Default</SmartCode>
    </div>
  )
}
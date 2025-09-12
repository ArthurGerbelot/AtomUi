import { Endpoint, EndpointExample } from "@/lib/endpoints";
import { StackProps } from "@uikit";

export type EndpointCodeProps = StackProps & {
  endpoint: Endpoint;
  example: EndpointExample;
  exampleIdx: number;
}
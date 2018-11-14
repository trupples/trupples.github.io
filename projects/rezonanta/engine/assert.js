export default function assert(conditionThatShouldBeTrue) {
	if(!conditionThatShouldBeTrue)
		throw "AssertionError";
}

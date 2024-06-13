
## Task

 * 1) Clear Schema database, and create database // conclusion do DB thing
 * 2) Do services for each database Then test with commond controller and API
 * 3) review flow again then make API handle reject process
 * 4) Make process manager focus on our seqeunce charts.
 * 5) Testing follow our chart. if possible we create debuggin tools in React. to see current state.
 *      - Green -> COmplete
 */

/**
 * Debuggin system
 * 1) we have socket.io, have parameter
 *  @params : ProcessStep start = 1 : number, AlarmError : boolean
 * 2) we craete flowchart by step from 1 to n
 * 3) at backend when process complete we will +1 to ProcessStep
 * 4) At frontend we will code color at our shape code like
 *      - @step1  If (!error) {
 *                If (ProcessStep = 1) return color = green blinking with light green
 *               else if(ProcessStep > 1) return color = green darker
 *               else return color = grey }
 *                else return color = red
 *      - @stepn If (!error) {
 *                If (ProcessStep = n) return color = green blinking with light green
 *               else if(ProcessStep > n) return color = green darker
 *               else return color = grey }
 *                else return color = red
 * 
 *  5) for complete status , let future do.
 */

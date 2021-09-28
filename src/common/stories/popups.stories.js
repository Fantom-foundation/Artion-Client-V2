export default {
    title: 'Design System/Popups',
};

export const Popups = () => ({
    //language=HTML
    template: `
        <div>
            <a-window
                modal
                title="Default window"
                class="fwindow-width-5"
                ref="win"
            >
                <div>
                    <f-input name="t1" label="Input 1" />
                    <f-input name="t2" label="Input 2" />
                </div>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolor ducimus enim impedit minima molestias quae qui! At culpa cum debitis explicabo harum ipsa, ipsam modi nemo, nostrum porro rerum.</div><div>Deleniti eaque error, eum incidunt ipsum labore nobis obcaecati omnis qui sequi soluta unde. Accusamus, dignissimos doloremque, enim, est eveniet excepturi in iusto maiores odit officiis ratione repudiandae velit voluptatibus!</div><div>Ab aliquam architecto consectetur culpa delectus deserunt dicta doloremque esse facere illo iure libero maiores modi, quis reprehenderit sunt vel vero voluptas. A cumque, eius fuga officiis quo soluta vitae!</div><div>Ab accusamus aspernatur cum cupiditate debitis delectus dignissimos dolores ea eaque, exercitationem facere in libero neque nobis non numquam pariatur perspiciatis porro ratione recusandae sint suscipit tempora tempore voluptates voluptatum!</div><div>Incidunt officia, rem repellendus sapiente velit vero. Blanditiis consequuntur delectus distinctio dolores doloribus eius, esse est impedit in ipsam laudantium natus odio perferendis possimus saepe sit soluta velit voluptate voluptatem?</div>
            </a-window>

            <div style="padding-top: 100px">
                <f-button @click.native="$refs.win.show()">show</f-button>

                <div style="opacity: 0.5">
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem culpa delectus dolorum earum facere impedit in incidunt libero magnam officiis rem soluta, tempore ullam vero voluptate? Minus, quia, sed? Fugit?</div><div>Alias, aliquid aut debitis dignissimos dolor, dolore dolorem dolorum enim et exercitationem id modi mollitia nisi nobis quam qui quis recusandae sapiente sit tempore tenetur vel, veritatis vitae voluptates voluptatum.</div><div>Aliquam aut doloremque dolorum in labore minus necessitatibus nemo, tempora tempore voluptate. A, aperiam consequatur dolore doloribus fuga nobis sunt vero voluptatum? Cumque deleniti doloribus voluptates? Expedita maxime quis repudiandae?</div><div>Autem dolorum illum, libero magnam nostrum tempora tempore. Asperiores at debitis earum, harum nemo optio? Aut corporis expedita illo officiis perferendis. Culpa explicabo id, nihil porro quae reiciendis reprehenderit voluptates.</div><div>Amet dolore dolores inventore labore laborum minus modi molestiae nesciunt, nihil perspiciatis quaerat quas quos sit, tenetur unde. Ab consectetur distinctio dolores quae quaerat. Blanditiis nemo quidem sunt totam veritatis?</div><div>A amet consequatur cumque ea error excepturi, explicabo impedit itaque, libero modi neque non, numquam omnis quia ratione sit velit? Delectus esse eum fuga quam quibusdam ratione repellendus tempora vitae!</div><div>Ab accusamus adipisci assumenda blanditiis commodi consequatur cum eius eveniet facere illo ipsum iste labore libero maiores, odio officiis omnis, porro quae quam quia quod rem repudiandae rerum voluptatem, voluptatum.</div><div>Accusamus ad consequatur debitis ea eaque exercitationem inventore, laudantium natus nobis, praesentium quas tempora ut voluptas. Accusantium consectetur explicabo id labore libero molestiae quo sit soluta suscipit vel. Eaque, maiores?</div><div>A accusamus aliquid amet at autem cum dolores ducimus fugit ipsum, laboriosam magnam minus molestias nostrum optio qui quisquam totam veniam. Distinctio dolore fuga, fugit inventore labore magni nostrum vero.</div><div>Aliquid at atque aut, cumque dolor doloribus, dolorum ducimus eaque eos eveniet iste maiores maxime necessitatibus nemo quam quo reiciendis repudiandae similique voluptate voluptatem. Culpa ducimus eius et libero ratione!</div><div>Accusamus, architecto asperiores cumque deleniti dignissimos dolores doloribus earum enim eos est expedita in, incidunt iusto libero magnam molestiae neque quos, recusandae repellat repudiandae temporibus tenetur totam veritatis. Nesciunt, tempore?</div><div>Ab animi aspernatur autem deleniti dolor eos error excepturi exercitationem ipsam, ipsum iste iure iusto nam necessitatibus nisi obcaecati optio perspiciatis quaerat quis quos recusandae sed suscipit totam, velit, vero!</div><div>A aliquam, consequatur consequuntur excepturi illo magnam natus officia pariatur possimus provident rem repellendus tenetur unde. Assumenda, beatae dolorem enim hic inventore magnam provident quaerat reprehenderit rerum. Earum, fuga, nulla!</div><div>Assumenda eius enim expedita facilis labore minima odio officiis pariatur provident quam ratione, totam! Ad aliquam culpa deserunt doloremque ducimus, error fuga ipsam, nobis quam quas qui repellat vel voluptatibus?</div><div>Asperiores consequatur cumque esse est non quisquam quo similique suscipit. Consectetur cupiditate enim eum expedita iure nemo nulla porro qui, repellat temporibus? Debitis error exercitationem illum natus nisi placeat quod?</div><div>Alias aliquid asperiores cupiditate debitis eaque enim exercitationem fuga fugiat illum inventore nostrum officiis, omnis porro quaerat qui quibusdam sequi soluta tenetur ullam voluptates! Asperiores necessitatibus nihil qui recusandae repudiandae!</div><div>A aut, cum deleniti distinctio dolor dolorem in ipsum magnam maxime modi odio odit pariatur porro quam quas quisquam ratione recusandae repellat reprehenderit rerum temporibus tenetur veniam vitae voluptatem voluptates!</div><div>Ab alias, asperiores autem consectetur corporis dolore eius in, ipsam minima nemo neque nesciunt nisi nobis odio omnis optio, perspiciatis porro quam recusandae similique sunt tempora temporibus velit vitae voluptates!</div><div>Accusantium asperiores deserunt doloribus ducimus eligendi et ex ipsam magni odit, officia praesentium quas sunt voluptatum. A atque deserunt fugiat impedit, inventore ipsa itaque minima nesciunt quasi quibusdam reprehenderit ullam!</div><div>Accusantium aperiam asperiores, autem delectus deserunt dolorem dolorum ea ex expedita explicabo fugiat incidunt laudantium libero, nemo non numquam, omnis praesentium quaerat quibusdam ratione sequi voluptates voluptatum? Aut error, similique.</div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {};
    },
});
